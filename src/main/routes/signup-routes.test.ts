import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return ann account on sucess', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Henrique',
        email: 'henrique@campaner.com',
        password: 'password123',
        passwordConfirmation: 'password123'
      })
      .expect(200)
  })
})
