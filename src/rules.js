export default [
    ['/', () => {
    console.count('visit')
    }],

    ['/randomFigure', (args, { languages }) => {
    for (const lang in languages){
        console.count(lang)
    }
    }],

    ['/', (args, { languages }) => {
    if (languages.uk) {
        console.warn('It is ukrainian')
    }
    }]
]
