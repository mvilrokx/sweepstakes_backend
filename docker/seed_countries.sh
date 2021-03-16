#!/usr/bin/env node
const fs = require('fs')

const nonCountries = [
  { countryName: 'England', isoAlpha3: 'ENG', countryCode: 'EL' },
  { countryName: 'Northern Ireland', isoAlpha3: 'NIR', countryCode: 'ND' },
  { countryName: 'Scotland', isoAlpha3: 'SCO', countryCode: 'OL' },
  { countryName: 'Wales', isoAlpha3: 'WAL', countryCode: 'WL' },
]

const getContent = url =>
  new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : require('http')
    const request = lib.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(
          new Error('Failed to load data, status code: ' + response.statusCode)
        )
      }
      const body = []
      response.on('data', chunk => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
    })
    request.on('error', err => reject(err))
  })

const createSeedCountriesFile = countries => {
  const path = '015_seed_countries.sql'

  // delete file
  try {
    fs.unlinkSync(path)
  } catch (err) {
    console.warn(err)
  }

  countries.map(({ isoAlpha3, countryCode, countryName }) => {
    try {
      fs.writeFileSync(
        path,
        `INSERT INTO countries(id, code, name) VALUES ('${isoAlpha3}', '${countryCode}', '${countryName}');\n`,
        { flag: 'a+' }
      )
    } catch (err) {
      console.error(err)
    }
  })
}

getContent('http://api.geonames.org/countryInfoJSON?username=mvilrokx')
  .then(result => JSON.parse(result).geonames.concat(nonCountries))
  .then(data => createSeedCountriesFile(data))
  .catch(err => console.error(err))
