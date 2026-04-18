import { MongoClient } from 'mongodb';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (req.headers['x-pipeline-secret'] !== process.env.PIPELINE_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { registrationId } = req.body ?? {};
  if (!registrationId) {
    return res.status(400).json({ error: 'registrationId required' });
  }

  if (!process.env.MONGODB_URI) {
    console.error('[mark-sent] MONGODB_URI env var is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    await client
      .db('v1-production')
      .collection('event-registrations')
      .updateOne(
        { registrationId },
        { $set: { emailSent: true, notificationSent: true, processedAt: new Date() } }
      );
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[mark-sent]', err);
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
}
