
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
          id: 0,
          name: 'ShirleyHopkins',
          userImage: 'http://placehold.it/0',
          slug: 'ShirleyHopkins'
        },
        {
          id: 1,
          name: 'ShariPope',
          userImage: 'http://placehold.it/1/32x32',
          slug: 'ShariPope'
        },
        {
          id: 2,
          name: 'HelenaBoyd',
          userImage: 'http://placehold.it/2/32x32',
          slug: 'HelenaBoyd'
        },
        {
          id: 3,
          name: 'YoungCherry',
          userImage: 'http://placehold.it/3/32x32',
          slug: 'YoungCherry'
        },
        {
          id: 4,
          name: 'WheelerVega',
          userImage: 'http://placehold.it/4/32x32',
          slug: 'WheelerVega'
        },
        {
          id: 5,
          name: 'GloriaNixon',
          userImage: 'http://placehold.it/5/32x32',
          slug: 'GloriaNixon'
        },
        {
          id: 6,
          name: 'NitaParks',
          userImage: 'http://placehold.it/6/32x32',
          slug: 'NitaParks'
        },
        {
          id: 7,
          name: 'MavisDale',
          userImage: 'http://placehold.it/7/32x32',
          slug: 'MavisDale'
        }
      ])
    })
}
