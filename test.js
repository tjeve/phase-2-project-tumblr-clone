const faker = require('faker')
const fakeData = []
const userCount = 8
for (let j = 0; j < userCount; j++) {
  const fakerName = faker.name.findName()
  const fakerSlug = fakerName
    .replace(/\s/g, '-')
    .replace(/'/g, '')
    .toLowerCase()
  fakeData.push({
    name: fakerName,
    userImage: faker.image.avatar(),
    slug: fakerSlug,
    tagline: faker.lorem.sentence(),
    postedImage: `${faker.random.image()}?random=${faker.random.number() *
      faker.random.number()}`.replace(/^http/g, 'https')
  })
}

console.log(fakeData)
