---
title: 'ServiceNow Washington DC: Flow Designer New Features - Break and Continue'
date: 2024-02-04
tags: ['ServiceNow']
author: Kevin Custer
publish: yes
excerpt: >-
  The Washington DC release of ServiceNow brings a couple of welcome additions to Flow Designer - Break and Continue functionality in For loops. These small but powerful additions can help clean up workarounds that were previously used to accomplish similar functionality. In this article, I will briefly cover how to use them!
---

In my daily use of Flow Designer, for loops are a staple, especially when dealing with ServiceNow records or API responses. Frequently, I encounter situations where I need to swiftly exit a loop or skip to the next iteration. This is where the recently added Break and Continue features in Flow Designer come in handy.

# Break and Continue in Action

Let's focus on the practical side of the new **Exit Loop** and **Skip Iteration** features:

![Break and Continue](./images/snow-dc-fd-break-continue-1.png)

In a simple example, imagine a flow that fetches all incidents assigned to a user and sends an email for each incident. With the **Exit Loop** flow logic, we can immediately exit out of the loop if the incident count exceeds 5, opting for a consolidated email outside of the loop to prevent mailbox overload.

Similarly, when dealing with incidents categorized as Inquiry/Help, the **Skip Iteration** flow logic can be used to ignore the entire iteration, preventing an email from being sent for these types of incidents.

With these new flog logic steps, we can avoid building workarounds that use more steps to accomplish the same outcome.

# Real-World Application

When you're working with Flow Designer day-to-day, these new flow logic steps really come in handy. Whether you're looping through ServiceNow records or a large API response payload, there are moments when you just need to wrap up a loop or skip through some iterations. Break and Continue are your trusty tools for those real-life situations, making your tasks smoother without any fuss.

# What Lies Ahead

The addition of these enhancements into Flow Designer marks a notable improvement in the developer experience. These seemingly small features contribute to a more refined and efficient workflow, showcasing ServiceNow's commitment to continually enhancing its platform - Flow Designer in particular. Stay tuned for upcoming articles where I'll delve into the evolving ServiceNow development landscape, exploring additional enhancements within Flow Designer from the Washington DC release.
