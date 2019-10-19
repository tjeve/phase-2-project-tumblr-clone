
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Users').del()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
          name: 'ShirleyHopkins',
          userImage: 'http://placehold.it/0',
          slug: 'ShirleyHopkins'
        },
        {
          name: 'ShariPope',
          userImage: 'http://placehold.it/1/32x32',
          slug: 'ShariPope'
        },
        {
          name: 'HelenaBoyd',
          userImage: 'http://placehold.it/2/32x32',
          slug: 'HelenaBoyd'
        },
        {
          name: 'YoungCherry',
          userImage: 'http://placehold.it/3/32x32',
          slug: 'YoungCherry'
        },
        {
          name: 'WheelerVega',
          userImage: 'http://placehold.it/4/32x32',
          slug: 'WheelerVega'
        },
        {
          name: 'GloriaNixon',
          userImage: 'http://placehold.it/5/32x32',
          slug: 'GloriaNixon'
        },
        {
          name: 'NitaParks',
          userImage: 'http://placehold.it/6/32x32',
          slug: 'NitaParks'
        },
        {
          name: 'MavisDale',
          userImage: 'http://placehold.it/7/32x32',
          slug: 'MavisDale'
        }
      ])
    })
}
