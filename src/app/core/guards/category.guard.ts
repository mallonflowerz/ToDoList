import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FirebaseConfigService } from '../../services/firebase.config.service';

export const categoryGuard: CanActivateFn = (route, state) => {
    const configService = inject(FirebaseConfigService);
    const router = inject(Router);

    if (configService.getCategoryActive()) {
        return true;
    }

    return router.createUrlTree(['/']);
};