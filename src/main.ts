import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx3QXxbf1x0ZFFMZVxbRn5PIiBoS35RckVgWHpfd3RdRWJbUUF2")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
