# PowerShare API
API for PowerShare project of Getir-BiTaksi-Hackathon-2018 written by **meverg** from team **1st Hackathoners**.

## Requests and Responses
_host_: https://power-share-hackathon.herokuapp.com
_only post requests handled_

### /find/powerbank
**request params:**
* latitude
* longitude
* range (in meters)

**response json:**
* result: array of nearby stations' locations in the format { name, location: [longitude, latitude], available_pb_num, available_cp_num }..........._(pb=powerbank, cp=charge port)_
* code: 1 if request succeeded, 0 if request failed.

### /find/chargeport
**request params:**
* latitude
* longitude
* range (in meters)

**response json:**
* result: array of nearby stations' locations in the format { name, location: [longitude, latitude], available_pb_num, available_cp_num }..........._(pb=powerbank, cp=charge port)_
* code: 1 if request succeeded, 0 if request failed.

### /user/create
**request params:**
* username
* password

**response json:**
* msg: 'username already taken' or 'user created successfully'
* code: 1 if request succeeded, 0 if request failed.

### /user/info
**request params:**
* username

**response json:**
* username
* credit
* session: { session_start, session_end, isOn }
* password
* code: 1 if request succeeded, 0 if request failed.

### /user/sessionChange
**request params:**
* username
* changedTo: true if powerbank connected, false if powerbank deconnected
* _(if changedTo is false and session ended succesfully)_ fee: service fee
* psName: power station's name to be the session change done on.

**response json:**
* msg: 'session not started: low credit' if credit is too low, 'session started' if changedTo is true and process succeeded, 'session ended' if changedTo is false and process succeeded.
* code: 1 if request succeeded, 0 if request failed.
