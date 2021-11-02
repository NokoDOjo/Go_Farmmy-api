const sinon = require('sinon')
const chai = require('chai')
const request = require('supertest')
chai.use(require('sinon-chai'))
const db = require('../../models')
const app = require('../../app')

const { expect } = require('chai')

describe('#User requests', () => {
  describe('POST /api/users', () => {
    before(async () => {
      await db.User.destroy({ where: {}, truncate: true })
    })

    it('Register user', done => {
      request(app)
        .post('/api/users')
        .send('name=User1&email=User1@example&password=User1')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          db.User.findByPk(1).then(user => {
            if (err) return done(err)
            expect(user.name).to.be.equal('User1')
            expect(user.email).to.be.equal('User1@example')

            return done()
          })
        })
    })

    after(async () => {
      await db.User.destroy({where: {},truncate: true})
    })
  })
})