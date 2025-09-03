import getConnection from '../../lib/db';

export default async function handler(req, res) {
  const connection = await getConnection();
  
  if (req.method === 'POST') {
    const { name, address, city, state, contact, image, email_id } = req.body;
    
    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ error: 'School name must be between 2-100 characters' });
    }
    if (address.length < 5 || address.length > 200) {
      return res.status(400).json({ error: 'Address must be between 5-200 characters' });
    }
    if (city.length < 2 || city.length > 50) {
      return res.status(400).json({ error: 'City must be between 2-50 characters' });
    }
    if (state.length < 2 || state.length > 50) {
      return res.status(400).json({ error: 'State must be between 2-50 characters' });
    }
    if (contact.length !== 10) {
      return res.status(400).json({ error: 'Contact number must be exactly 10 digits' });
    }
    if (email_id.length > 100) {
      return res.status(400).json({ error: 'Email must be less than 100 characters' });
    }

    // Validate formats
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res.status(400).json({ error: 'School name should only contain letters and spaces' });
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      return res.status(400).json({ error: 'City should only contain letters and spaces' });
    }
    if (!/^[a-zA-Z\s]+$/.test(state)) {
      return res.status(400).json({ error: 'State should only contain letters and spaces' });
    }
    if (!/^[6-9]\d{9}$/.test(contact)) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9' });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email_id)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }
    
    try {
      const [result] = await connection.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name.trim(), address.trim(), city.trim(), state.trim(), contact.trim(), image || '', email_id.trim()]
      );
      res.status(201).json({ id: result.insertId, message: 'School added successfully' });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(400).json({ error: 'A school with this email already exists' });
      } else {
        res.status(500).json({ error: 'Failed to add school: ' + error.message });
      }
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await connection.execute('SELECT * FROM schools');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch schools: ' + error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}