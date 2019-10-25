exports.seed = function (knex) {
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
      tagline: faker.lorem.sentence()
    })
  }

  // Deletes ALL existing entries
  return knex('Users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert(fakeData)
      // return knex('Users').insert([
      //   {
      //     name: 'ShirleyHopkins',
      //     userImage: 'http://placehold.it/0',
      //     slug: 'ShirleyHopkins',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'ShariPope',
      //     userImage: 'http://placehold.it/1/32x32',
      //     slug: 'ShariPope',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'HelenaBoyd',
      //     userImage: 'http://placehold.it/2/32x32',
      //     slug: 'HelenaBoyd',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'YoungCherry',
      //     userImage: 'http://placehold.it/3/32x32',
      //     slug: 'YoungCherry',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'WheelerVega',
      //     userImage: 'http://placehold.it/4/32x32',
      //     slug: 'WheelerVega',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'GloriaNixon',
      //     userImage: 'http://placehold.it/5/32x32',
      //     slug: 'GloriaNixon',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'NitaParks',
      //     userImage: 'http://placehold.it/6/32x32',
      //     slug: 'NitaParks',
      //     tagline: 'Insert witty tagline here!'
      //   },
      //   {
      //     name: 'MavisDale',
      //     userImage: 'http://placehold.it/7/32x32',
      //     slug: 'MavisDale',
      //     tagline: 'Insert witty tagline here!'
      //   }
      // ])
    })
}
