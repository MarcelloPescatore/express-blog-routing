const posts = require('../db/db.js')
const fs = require('fs')

// index: ritornerà un html con una ul che stamperà la lista dei post
const index = (req, res) => {
    let markup = ''

    posts.forEach(post => {
        const { title, slug, content, image, tags } = post;

        return markup += `
            <li>
                <h2>${title}</h2>
                <h3>${slug}</h3>
                <h4>${content}</h4>
                <img src="/imgs/posts/${image}"</img> <br>
                <span>${tags}</span>
            </li>
        `
    });

    return res.send(`<ul>${markup}</ul>`)
};

// show: tramite il parametro dinamico che rappresenta lo slug del post, ritornerà un json con i dati del post
const show = (req, res) => {
    const post = posts.find(post => post.slug === req.params.slug);
    if (!post) {
        return res.status(404).send('Post non trovato');
    }
    
    return res.status(200).json({
        data: post
    })
}

// Creare inoltre un filtro in querystring per tag, che ritorna in formato json tutti i post che hanno quei tag
const filter = (req, res) => {
    const {tag} = req.query;
    console.log(tag);
    

    if(!tag) {
        return res.status(400).json({ error: 'Nessun tag specificato' });
    }

    // utilizzo filter per filtrare i post che includono tag
    const postsFiltrati = posts.filter(post => post.tags.includes(tag));
    console.log(postsFiltrati);
    

    return res.status(200).json({ 
        data: postsFiltrati 
    });
}


// Aggiungi il metodo store per la creazione di un nuovo post
const store = (req, res) => {
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: [req.body.tags]
    }

    posts.push(post);

    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    res.json({
        status: 201,
        data: posts,
        counter: posts.length
    })
}


module.exports = {
    index, 
    show, 
    store,
    filter
}