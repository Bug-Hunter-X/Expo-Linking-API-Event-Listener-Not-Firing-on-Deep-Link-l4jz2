# Expo Linking API Event Listener Not Firing on Deep Link

This repository demonstrates a bug where the Expo Linking API's `addEventListener` method doesn't reliably fire when the app is launched via a deep link, particularly if the app is already open.  The issue seems related to handling deep links that lack a custom URL scheme or race conditions during app startup.

## Bug Description
The `Linking.addEventListener` method in Expo is designed to listen for incoming URLs.  However, it can sometimes fail to trigger if the app is already running and receives a deep link, or if the app is launched via a deep link but isn't properly handling the initial URL.  This can be very frustrating, as the user would expect the app to respond to a deep link correctly, independent of whether the app is already running.

## Reproduction
Clone this repository and run the `bug.js` example to see the issue in action.  Try opening the app and then triggering a deep link, noting that the event listener might not fire.

## Solution
The `bugSolution.js` file provides a solution involving a delay to accommodate potential race conditions, which makes sure the event listeners are already setup before checking for the initial URL.