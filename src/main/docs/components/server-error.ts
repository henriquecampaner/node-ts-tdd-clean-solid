export const serverError = {
  description: 'Internal Error',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
}
