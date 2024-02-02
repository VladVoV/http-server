function parseAcceptLanguagesHeader(acceptLanguagesHeader) {
    const languages = {};

    if (!acceptLanguagesHeader) return languages;

    acceptLanguagesHeader.split(',').forEach(function(lang) {
        const [language, qValue] = lang.trim().split(';q=');
        const code = language.trim().split('-')[0];

        const quality = qValue ? parseFloat(qValue) : 1;

        if (languages[code]) {
            languages[code] = Math.max(languages[code], quality);
        } else {
            languages[code] = quality;
        }
    });

    return languages;
}

export default fn => (req, res) => {
    const languages = parseAcceptLanguagesHeader(req.headers['accept-language'])

    req.context = {
        languages,
        userAgent: req.headers['user-agent']
    }

    return fn(req, res)
}
