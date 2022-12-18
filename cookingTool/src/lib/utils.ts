import { goto } from '$app/navigation';

export function routeToPage(route: string, replaceState: boolean) {
   goto(`/${route}`, { replaceState }) 
}
