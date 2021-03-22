import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'API using Clean/SOLID/DDD/TDD',
    version: '1.0.0',
    contact: {
      name: 'Henrique Campaner',
      email: 'henrique.campaner@live.com',
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  externalDocs: {
    description: 'Link para o treinamento completo',
    url: 'https://www.udemy.com/course/tdd-com-mango/?referralCode=B53CE5CA2B9AFA5A6FA1'
  },
  servers: [{
    url: '/api',
    description: 'Main server'
  }],
  tags: [{
    name: 'Login',
    description: 'Login routes'
  }, {
    name: 'Surveys',
    description: 'Survey Routes'
  }],
  paths,
  schemas,
  components
}
