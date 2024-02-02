let cars = [
    { mark: "Toyota", type: "Sedan", country: "Japan", languageTest: 'ja' },
    { mark: "Ford", type: "SUV", country: "USA", languageTest: 'en' },
    { mark: "Volkswagen", type: "Hatchback", country: "Germany", languageTest: 'de' },
    { mark: "Hyundai", type: "Compact", country: "South Korea", languageTest: 'ko' },
    { mark: "DevourerOfWorlds", type: "Aircraft", country: "Ukraine", languageTest: 'uk' }
];

export default ({filter = null}, {languages}) => {
    const understoodContent = cars.filter(({languageTest}) => languages[languageTest])

    if (filter) {
        return understoodContent
            .filter(({mark}) => mark === filter)
    }

    return understoodContent
}
