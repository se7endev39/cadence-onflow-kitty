export const args = [
    {
      name: "2010 Bowman Draft Picks Manny Machado ROOKIE RC #BDPP80 PSA 10 GEM MINT",
      grade: "PSA 10",
      serial: 22129333,
      image: "Qmec8XfVmibXTYhGMn9qst6sySmcDeQk8S9p4RVX9tTPzt"
    },
    {
      name: "2010 Bowman Draft Picks Manny Machado ROOKIE RC #BDPP80 PSA 10 GEM MINT",
      grade: "PSA 10",
      serial: 28474567,
      image: "QmY2oVKU6GfvyfnQJjybAhSiqnhZroG63oNkACAfp8LyZr"
    },
    {
      name: "2020 Panini Prizm WNBA Purple Sabrina Ionescu ROOKIE RC /125 #89 PSA 9 MINT",
      grade: "PSA 9",
      serial: 52961680,
      image: "QmbNSz7Bh1xS83HoMEgpzBsYFoVDSsdztYyAK12KYnQCKW"
    },
    {
      name: "2017 Donruss Football Patrick Mahomes II ROOKIE RC #327 PSA 10 GEM MINT",
      grade: "PSA 10",
      serial: 49277141,
      image: "QmTpX3jXyf9dLGGu4AhjcaB3KexJfG6kk49PPkFuUZNbi1"      
    },
    {
      name: "2019 Topps Chrome Bundesliga Erling Haaland ROOKIE RC #72 PSA 10 GEM MINT",
      grade: "PSA 10",
      serial: 49818702,
      image: "QmWr6mNCCFquHMsMy69qXxzRUGxxr3W9rW2fQshTzM6We1"
    }
  ]
  
  export const ITEM_KIND_MAP = [
    {
      name: "Fernando TatisJR",
      grade: 'PSA 8',
      serial: 22129333,
    },
    {
      name: "Kyler Murray",
      grade: 'PSA 7',
      serial: 28474567,
    },
    {
      name: "Lamar Jackson",
      grade: 'PSA 10',
      serial: 52961680,
    },
    {
      name: "Lebron James",
      grade: 'PSA 8',
      serial: 49277141,
    },
    {
      name: "Luka Doncic",
      grade: 'PSA 7',
      serial: 49277141,
    },
    {
      name: "Mike Trout",
      grade: 'PSA 8',
      serial: 49818702,
    },
    {
      name: "Patrick Mahomes",
      grade: 'PSA 10',
      serial: 22129333,
    },
    {
      name: "Ronald AcumaJR",
      grade: 'PSA 7',
      serial: 49818702,
    },
    {
      name: "Stephen Curry",
      grade: 'PSA 9',
      serial: 59232341,
    },
    {
      name: "Zion Williamson",
      grade: 'PSA 8',
      serial: 68325333,
    }
  ]

  export function parameterize(str) {
    return str.trim().toLowerCase().replace(" ", "-")
  }
  export function getCardImage(cardId) {
    const kindName = ITEM_KIND_MAP[cardId % ITEM_KIND_MAP.length].name
    return `/static/images/cards/${parameterize(kindName)}.jpg`
  }
  export function getCardName(cardId) {
    return ITEM_KIND_MAP[cardId % ITEM_KIND_MAP.length].name
  }
  export function getCardGrade(cardId) {
    return ITEM_KIND_MAP[cardId % ITEM_KIND_MAP.length].grade
  }
  export function getCardSerial(cardId) {
    return ITEM_KIND_MAP[cardId % ITEM_KIND_MAP.length].serial
  }