const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const crypto = require('crypto');

const cookieParser = require('cookie-parser')

const app = express();
const port = 5000;

function generateCsrfToken() {
  return crypto.randomBytes(64).toString('hex');
}
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(rateLimit({
  windowMs: 1000,
  max: 5,
  message: 'Too many requests, please try again later.',
}))

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'"],
  },
}));

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.method === 'GET') {
    const token = generateCsrfToken();
    res.cookie('csrfToken', token, { httpOnly: true, sameSite: 'Strict' });
    res.locals.csrfToken = token;
  }
  next();
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: res.locals.csrfToken });
});

app.post('/fetch-metadata', async (req, res) => {
  const tokenFromCookie = req.cookies.csrfToken;
  const tokenFromHeader = req.headers['x-csrf-token'];
  if (tokenFromCookie !== tokenFromHeader) {
    return res.status(403).send('Forbidden');
  }

  const { urls } = req.body;
  const promises = urls.map(async (url) => {
    try {
      const response = await axios.get(url);
      const html = response.data;

      const metadata = {
        title: html.match(/<title>(.*?)<\/title>/)?.[1] || 'This Website has no title',
        description: html.match(/<meta name="description" content="(.*?)"/)?.[1] || 'This Website has no description',
        image: html.match(/<meta property="og:image" content="(.*?)"/)?.[1] || 'This Website has no image',
      };

      return metadata;
    }
    catch (error) {
      console.error(error.message)
      return { error: "Invalid URL" }
    }
  })
  try {
    const responses = await Promise.all(promises);
    res.status(200).json(responses);
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Error fetching metadata');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'An unexpected error occurred',
      code: err.status || 500
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});