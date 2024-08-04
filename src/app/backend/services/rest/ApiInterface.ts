import { Constants } from "@/utils/Constants";
import HttpInterface from "@/app/backend/services/rest/HttpInterface";

class ApiInterface extends HttpInterface {
  constructor() {
    super(Constants.EXTERNAL_CONFIGS.API_REQUEST_TIMEOUT);
  }
}

export default new ApiInterface();
