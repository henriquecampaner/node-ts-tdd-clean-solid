export class QueryBuilder {
  private readonly query = []

  private addStep(step: string, data: object): QueryBuilder {
    this.query.push({
      [step]: data,
    })
    return this
  }

  match(data: object): QueryBuilder {
    this.query.push({
      $match: data,
    })
    return this
  }

  group(data: object): QueryBuilder {
    this.query.push({
      $group: data,
    })
    return this
  }

  sort(data: object): QueryBuilder {
    return this.addStep('$sort', data)
  }

  unwind(data: object): QueryBuilder {
    this.query.push({
      $unwind: data,
    })
    return this
  }

  lookup(data: object): QueryBuilder {
    this.query.push({
      $lookup: data,
    })
    return this
  }

  project(data: object): QueryBuilder {
    this.query.push({
      $project: data,
    })
    return this
  }

  build(): object[] {
    return this.query
  }
}
