import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.cmp';
import { BroadcastComponent } from './broadcast/broadcast.cmp';
@NgModule({
	declarations: [ProfileComponent,
    BroadcastComponent],
	imports: [],
	exports: [ProfileComponent,
    BroadcastComponent]
})
export class ComponentsModule {}
