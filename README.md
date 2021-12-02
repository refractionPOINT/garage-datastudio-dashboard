
# garage-datastudio-dashboard
Example of using Google Data Studio to build LimaCharlie dashboards.

## Idea
The idea behind this garage-project is to create beautiful [dashboards](https://datastudio.google.com/embed/u/0/reporting/6d699bc8-daca-42b4-943c-2266793507ff/page/p_iywqe2ojpc) and/or nice widgets to be embedded into customers websites or SOC content management systems.

An example of how the code can be embedded can be found [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/1c243ebc2b246b99ea535a1835ee5b6167fa947c/www/dist/index.html#L10), together with a minimalistic web page [template](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/dist/index.html).

This approach will also allow you to have a granular control of the permissions related to users authorised to access the dashboard, and even schedule periodic reports that will automatically land in users mailbox.

With a bit more of coding (slightly advanced), it will be also possible to create alerts based on Google Big Query.

## How to
We can leverage the power of [LimaCharlie webhook outputs](https://doc.limacharlie.io/docs/documentation/ZG9jOjE5MzExMTY-outputs#webhook-details), Google Cloud and Google data studio.

### Google Cloud Function
If you are not familiar with [Google Cloud](https://cloud.google.com/) Functions, I created a basic one [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/function-source/index.js).
Once authenticated in [Google Cloud Platform](https://console.cloud.google.com/), let's create a new *Node.js* Cloud Function as per the [example](https://github.com/refractionPOINT/garage-datastudio-dashboard/tree/master/function-source) we just mentioned.

Now that you have a Cloud Function set, you can move to the tab `TRIGGER`, this will show you a Trigger URL.
This is the URL we should pass to app.limacharlie.io as core parameter of a new output.
### LimaCharlie
Create a new LimaCharlie Output:
`Add Output` &rightarrow; Choose `Detection` Output Stream &rightarrow; Choose `Webhook` as Output Destination

In the field `Output Destination` copy the Trigger URL of your Google Cloud Function.

For this experiment I flagged the following parameters:
  - Wrap JSON Event with Event Type
  - Delete on Failure
  - Flatten JSON to a single level
  
As soon as you will save the new output, all the detections that will fire in the related LimaCharlie ORG, will trigger the Google Cloud Function.

**IMPORTANT**: It's now time to check that your detection data are landing into Google Cloud Platform Logs, for doing this you can leverage the Log Explorer under the Logging Operations tab, and use the traditional SQL syntax to perform a query.
A basic one from the Log Explorer can be `"author"` or whatever terms you are expecting to be in your Detections Output (e.g. the `action: report` `name:` you set in your LimaCharlie Detection and Response Rule).
If events are not flowing, you cannot go forward with further steps.

### Google Cloud Platform &rightarrow; Log Router
Navigate to the [log router](https://console.cloud.google.com/logs/router) and `CREATE SINK`.
The sink creation procedure is very intuitive, and it is assisted by a very nice wizard, but you need to be sure to choose the following configuration:
|Step|Field|Dropdown option|
|--|--|--|
|Sink Destination|Select Sink Service|BigQuery dataset |
|Sink Destination|Select BigQuery dataset|Create a new BigQuery dataset|
