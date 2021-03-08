export const loginPath = {
  post: {
    tags: ['Login'],
    summary: 'Route to authenticate an user',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
            // Schema = response
          }
        }
      }
    }
  }
}
