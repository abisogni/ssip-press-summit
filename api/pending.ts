import { MongoClient } from 'mongodb';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.headers['x-pipeline-secret'] !== process.env.PIPELINE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.MONGODB_URI) {
    console.error('[pending] MONGODB_URI env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const docs = await client
      .db('v1-production')
      .collection('event-registrations')
      .find({ event: 'TX-2605', emailSent: false })
      .sort({ submittedAt: 1 })
      .limit(20)
      .toArray();
    return res.status(200).json(docs.map(d => ({
      registrationId: d.registrationId,
      confirmationNumber: d.confirmationNumber,
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      phone: d.phone,
      company: d.company,
      jobTitle: d.jobTitle,
      mailingList: d.mailingList ?? false,
      submittedAt: d.submittedAt,
    })));
  } catch (err) {
    console.error('[pending]', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
