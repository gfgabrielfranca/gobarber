import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityConteroller from '../controllers/ProviderMonthAvailabilityConteroller';
import ProviderDayAvailabilityConteroller from '../controllers/ProviderDayAvailabilityConteroller';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityConteroller = new ProviderMonthAvailabilityConteroller();
const providerDayAvailabilityConteroller = new ProviderDayAvailabilityConteroller();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityConteroller.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityConteroller.index,
);

export default providersRouter;
