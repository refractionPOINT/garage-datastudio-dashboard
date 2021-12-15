

# garage-datastudio-dashboard
Example of using Google Data Studio to build LimaCharlie dashboards.

## Idea
The idea behind this garage-project is to create beautiful [dashboards](https://datastudio.google.com/embed/u/0/reporting/6d699bc8-daca-42b4-943c-2266793507ff/page/p_iywqe2ojpc) and/or nice widgets to be embedded into customers websites or SOC content management systems.

An example of how the code can be embedded can be found [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/1c243ebc2b246b99ea535a1835ee5b6167fa947c/www/dist/index.html#L10), together with a minimalistic web page [template](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/dist/index.html).

This approach will also allow you to have a granular control of the permissions related to users authorised to access the dashboard, and even schedule periodic reports that will automatically land in users mailbox.

With a bit more of coding (slightly [advanced](https://cloud.google.com/bigquery/docs/monitoring-dashboard)), it will be also possible to create alerts based on Google Big Query.

## How to
We can leverage the power of [LimaCharlie webhook outputs](https://doc.limacharlie.io/docs/documentation/ZG9jOjE5MzExMTY-outputs#webhook-details), Google Cloud and Google data studio.

### Google Cloud Function
If you are not familiar with [Google Cloud](https://cloud.google.com/) Functions, I created a basic one [here](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/function-source/index.js).
Once authenticated in [Google Cloud Platform](https://console.cloud.google.com/), let's create a new *Node.js* Cloud Function as per the [example](https://github.com/refractionPOINT/garage-datastudio-dashboard/tree/master/function-source) we just mentioned.

#### Get started with Google Cloud
STEP 1 ► Create a new [Google Cloud](https://cloud.google.com/) project

![Create a nre Google Cloud project](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_41.png)

STEP 2 ► Create a new Google Cloud function

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_39.png)

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_38.png)

And you can just use the small piece of Node.js code shared in this [repo](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/function-source/index.js) as mentioned before:

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_37.png)

With the cloud function deployed you are ready to go to the next step:

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_36.png)

STEP 3  ► Now that you have a Cloud Function set, you can move to the tab `TRIGGER`, this will show you a Trigger URL:

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_35.png)

This is the URL we should pass to app.limacharlie.io as core parameter of a new output:

![Create a new Google Cloud function](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_30.png)

### LimaCharlie
STEP 4  ► Create a new LimaCharlie Output:
`Add Output` &rightarrow; Choose `Detection` Output Stream &rightarrow; Choose `Webhook` as Output Destination:

![Create a new LimaCharlie Output](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_29.png)

In the field `Output Destination` paste the Trigger URL of your Google Cloud Function:

![Create a new LimaCharlie Output](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_20.png)

For this experiment I flagged the following parameters:
  - Wrap JSON Event with Event Type
  - Flatten JSON to a single level
  
As soon as you will save the new output, all the detections that will fire in the related LimaCharlie ORG, will trigger the Google Cloud Function.

You can test the output looking at the Output Samples directly from the web UI:

![Create a new LimaCharlie Output](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_19.png)

**IMPORTANT**: It's now time to check that your detection data are landing into Google Cloud Platform Logs, for doing this you can leverage the Log Explorer under the Logging Operations tab, and use the traditional SQL syntax to perform a query.
A basic one from the Log Explorer can be `"author"` or whatever terms you are expecting to be in your Detections Output (in this example we will hunt for "powershell" activities):

![Logging](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_18.png)

If events are not flowing, you cannot go forward with further steps.

STEP 5  ► Create a Sink:

### Google Cloud Platform &rightarrow; Log Router
Navigate to the [log router](https://console.cloud.google.com/logs/router) and `CREATE SINK`:

![Create a sink](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_16.png)

The sink creation procedure is very intuitive, and it is assisted by a very nice wizard, but you need to be sure to choose the following configuration between the several steps:
|Step|Field|Option|
|--|--|--|
|Sink Destination|Select Sink Service|BigQuery dataset |
|Sink Destination|Select BigQuery dataset|Create a new BigQuery dataset|
|Choose logs to include in sink|Create an inclusion filter|`Your SQL query`

![Create a sink](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_15.png)

![Create a sink](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_14.png)

Now that the new sink is created, as soon as a new event will be logged AND it will match the inclusion filter you created, **the new BigQuery dataset will be automatically populated**:

![Create a sink](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_13.png)

CONGRATULATIONS: LimaCharlie is now connected to BigQuery!

![Create a sink](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_12.png)

HINT: To test the environement, you can simulate attacks with LimaCharlie leveraging our Atomic Red Team integration (https://www.youtube.com/watch?v=oL6D30IeZ7c):

![LimaCharlie / Atomic Red Team detections](https://github.com/refractionPOINT/garage-datastudio-dashboard/blob/master/www/images/garage-dashboard_24.png)

### Google Data Studio
Now that we have our BigQuery dataset and table set as part of our Google Cloud project, we can easily connect it to Google Data Studio as a datasource that will "give life" to the components of our dashboards and reports.

We can create a new report, insert the desired components on our preferred layout and then, keeping the focus on the element we want to connect to our data, add a new data source to it.

When the `Connect to data` window will appear, we just need to select the `BigQuery` option, and follow the swim-lane (Project &rightarrow; Dataset &rightarrow; Table &rightarrow; Configuration) until we reach our desired data source.
The option `Use timestamp as a data range dimension` is recommended but not mandatory.

Finally select `ADD` , and since then your component in the dashboard is ready to show the data with the option and the style you want to apply!
