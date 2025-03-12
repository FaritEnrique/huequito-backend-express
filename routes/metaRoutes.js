import express from 'express';

const router = express.Router();

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;

    // Simula obtener los datos desde la base de datos
    const pageData = {
        title: `El Huequito - ${slug.replace(/-/g, ' ')}`, // Convierte slug en título legible
        description: `Descubre más sobre ${slug.replace(/-/g, ' ')} en El Huequito.`,
        image: 'https://el-huequito.netlify.app/imagen.png',
        url: `https://el-huequito.netlify.app/${slug}`,
    };

    const html = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${pageData.title}</title>

            <!-- Meta Open Graph (para Facebook y redes sociales) -->
            <meta property="og:title" content="${pageData.title}" />
            <meta property="og:description" content="${pageData.description}" />
            <meta property="og:image" content="${pageData.image}" />
            <meta property="og:url" content="${pageData.url}" />
            <meta property="og:type" content="website" />

            <!-- Meta Twitter Cards -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${pageData.title}" />
            <meta name="twitter:description" content="${pageData.description}" />
            <meta name="twitter:image" content="${pageData.image}" />

            <!-- Redirección para usuarios -->
            <meta http-equiv="refresh" content="0; url=${pageData.url}" />
        </head>
        <body>
            <h1>${pageData.title}</h1>
            <p>${pageData.description}</p>
            <img src="${pageData.image}" alt="${pageData.title}" width="500">
            <p>Si no eres redirigido automáticamente, <a href="${pageData.url}">haz clic aquí</a>.</p>
        </body>
        </html>
    `;

    res.send(html);
});

export default router;