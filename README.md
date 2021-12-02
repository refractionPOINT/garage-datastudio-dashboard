# garage-datastudio-dashboard
Example of using Google Data Studio to build LimaCharlie dashboards.

## Idea
The idea behind this garage-project is to create beautiful [dashboards](https://datastudio.google.com/embed/u/0/reporting/6d699bc8-daca-42b4-943c-2266793507ff/page/p_iywqe2ojpc) and/or nice widgets to be embedded into customers websites or SOC content management systems.

An example of how the code can be embedded can be found [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/1c243ebc2b246b99ea535a1835ee5b6167fa947c/www/dist/index.html#L10), together with a minimalistic web page [template](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/dist/index.html).

This approach will also allow you to have a granular control of the permissions related to users authorised to access the dashboard, and even schedule periodic reports that will automatically land in users mailbox.

With a bit more of coding (slightly advanced), it will be also possible to create alerts based on Google Big Query.

## How to
We can leverage the power of [LimaCharlie webhook outputs](https://doc.limacharlie.io/docs/documentation/ZG9jOjE5MzExMTY-outputs#webhook-details), Google Cloud and Google data studio.

### Google Cloud
#### Google Cloud Function
If you are not familiar with [Google Cloud](https://cloud.google.com/) Functions, I created a basic one [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/function-source/index.js).
Once authenticated in [Google Cloud Platform](https://console.cloud.google.com/), let's create a new *Node.js* Cloud Function as per the [example](https://github.com/refractionPOINT/garage-datastudio-dashboard/tree/master/function-source) we just mentioned. 
