import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const b = req.body ?? {};
  const { firstName, lastName, email, phone, company, jobTitle, mailingList } = b;

  if (
    !firstName?.trim() || !lastName?.trim() || !email?.trim() ||
    !company?.trim() || !jobTitle?.trim()
  ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.MONGODB_URI) {
    console.error('[register] MONGODB_URI env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('v1-production');

    const counterDoc = await db.collection('event-counters').findOneAndUpdate(
      { _id: 'TX-2605' as any },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: 'after' }
    );
    const seq: number = (counterDoc as any)?.seq ?? 1;
    const confirmationNumber = `PS26-${String(seq).padStart(4, '0')}`;

    await db.collection('event-registrations').insertOne({
      registrationId: randomUUID(),
      event: 'TX-2605',
      confirmationNumber,
      submittedAt: new Date(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone ?? '').trim(),
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      mailingList: mailingList === true,
      status: 'pending',
      emailSent: false,
      notificationSent: false,
    });

    return res.status(200).json({ success: true, confirmationNumber });
  } catch (err) {
    console.error('[register]', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
