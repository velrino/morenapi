'use strict'

const DefaultCommand = use('./../default');
const CompanyPlaceRepository = use('App/Infra/Repositories/CompanyPlace');

class SearchCompanyPlaceCommand extends DefaultCommand {

  async execute({ request, auth, response }) {
    let user = null
    try {
      user = await auth.getUser()
    } catch (error) {
      response.send(error.message)
    }
    let queries = request.qs;
    if(user != null) {
      const { company_id } = user;
      queries = {...queries, company_id}
    }

    try {
      let data = await new CompanyPlaceRepository().getWhereRawJsonExtract(queries);

      return response.status(200).json(data);
    } catch (e) {
      return response.status(422).json({ message: 'UNPROCESSED' });
    }
  }
}
module.exports = SearchCompanyPlaceCommand
