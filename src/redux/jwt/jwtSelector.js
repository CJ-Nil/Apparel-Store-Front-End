import { createSelector } from 'reselect';

const selectJwt = state => state.jwt;
export const selectCurrentJwt = createSelector(
    [selectJwt],
    jwt => jwt.currentJwt,
)

