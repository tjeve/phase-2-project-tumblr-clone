
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('Posts').insert([
        {
          id: 0,
          userId: 0,
          postedImage: 'https://www.dw.com/image/40320815_303.jpg',
          numberOfNotes: 34,
          date: '2019-07-17T02:49:24 +05:00',
          postedMessage: 'Voluptate occaecat est minim esse eiusmod aliquip elit Lorem sunt cupidatat minim commodo pariatur.'
        },
        {
          id: 1,
          userId: 1,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 25,
          date: '2014-02-01T06:06:02 +06:00',
          postedMessage: 'Est aliquip sunt consectetur ut qui in Lorem exercitation fugiat amet excepteur anim elit laborum.'
        },
        {
          id: 2,
          userId: 2,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 0,
          date: '2014-05-04T06:59:11 +05:00',
          postedMessage: 'Ullamco eu sint consequat irure.'
        },
        {
          id: 3,
          userId: 3,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 33,
          date: '2016-09-23T05:43:59 +05:00',
          postedMessage: 'Cillum occaecat non nostrud enim fugiat nulla aute tempor deserunt.'
        },
        {
          id: 4,
          userId: 4,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 21,
          date: '2015-05-10T12:46:48 +05:00',
          postedMessage: 'Ad irure eu eiusmod proident dolor voluptate culpa ea nulla et.'
        },
        {
          id: 5,
          userId: 5,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 39,
          date: '2018-12-20T10:54:50 +06:00',
          postedMessage: 'Fugiat minim elit minim non exercitation consequat qui esse ea Lorem.'
        },
        {
          id: 6,
          userId: 6,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 14,
          date: '2014-11-03T08:53:30 +06:00',
          postedMessage: 'Id veniam ea ut laboris nulla cupidatat consectetur.'
        },
        {
          id: 7,
          userId: 7,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 20,
          date: '2016-01-06T01:34:03 +06:00',
          postedMessage: 'Ea proident incididunt sit duis voluptate id mollit.'
        },
        {
          id: 8,
          userId: 1,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 9,
          date: '2014-09-13T03:33:27 +05:00',
          postedMessage: 'Velit mollit voluptate minim dolor laborum pariatur.'
        },
        {
          id: 9,
          userId: 2,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 1,
          date: '2014-10-21T08:38:18 +05:00',
          postedMessage: 'Consequat labore quis excepteur ex.'
        },
        {
          id: 10,
          userId: 3,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 6,
          date: '2018-05-27T12:22:54 +05:00',
          postedMessage: 'Voluptate est anim velit velit eu reprehenderit magna eiusmod laboris sunt do mollit exercitation.'
        },
        {
          id: 11,
          userId: 4,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 0,
          date: '2019-09-04T12:42:48 +05:00',
          postedMessage: 'Ex pariatur incididunt ex in amet nostrud consequat quis fugiat.'
        },
        {
          id: 12,
          userId: 5,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 12,
          date: '2015-02-06T10:08:53 +06:00',
          postedMessage: 'Esse reprehenderit amet eu nulla excepteur dolor ad aliquip officia.'
        },
        {
          id: 13,
          userId: 6,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 36,
          date: '2018-05-11T01:20:54 +05:00',
          postedMessage: 'Laborum reprehenderit in ad nostrud culpa sunt dolore tempor occaecat amet.'
        },
        {
          id: 14,
          userId: 7,
          postedImage: 'http://placehold.it/32x32',
          numberOfNotes: 38,
          date: '2018-03-03T04:32:48 +06:00',
          postedMessage: 'Labore nisi ipsum duis incididunt esse duis dolor.'
        }
      ]
      )
    }
    )
}
