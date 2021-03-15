export const badRequest = {
  description: 'Inavalid Request',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
}
