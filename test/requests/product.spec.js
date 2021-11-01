const sinon = require('sinon')
const chai = require('chai')
const request = require('supertest')
chai.use(require('sinon-chai'))
const db = require('../../models')
const app = require('../../app')

const { expect } = require('chai')
const { sequelize, dataTypes, checkModelName, checkUniqueIndex, checkPropertyExists } = require('sequelize-test-helpers')

describe('#Product requests', () => {
  describe('GET /products', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1', quantity: 10 })
      await db.Product.create({ name: 'product2', quantity: 10 })
    })

    it('GET all products', done => {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.products.length).to.be.equal(2)
          expect(res.body.products[0].name).to.be.equal('product1')
          expect(res.body.products[1].name).to.be.equal('product2')

          done()
        })
    })

    after(async function() {
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  describe('GET /api/products/:id', () => {
    before(async function() {
      await db.Product.destroy({ where: {}, truncate: true})
      await db.Product.create({ name: 'product1', quantity: 10 })
    })

    it('GET specific product')
  })
})