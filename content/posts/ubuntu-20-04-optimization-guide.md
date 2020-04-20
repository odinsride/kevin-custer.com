---
title: "Ubuntu 20.04 Teardown Guide"
date: 2090-05-23
tags: ['Linux']
author: Kevin Custer
publish: no
excerpt: >-
  With the newly released Ubuntu LTS (20.04) upon us, I thought I would share some of the things I like to do to optimize a fresh install of Ubuntu to tailor it to my likings.  In this miniseries you will learn how to disable unnecessary services, remove the snap store, and more!
---

## Disclaimer

This guide is not intended for those who are new to Linux, but geared toward advanced Linux users who wish to install and maintain a very minimal Ubuntu system. We will be removing many default services and features of Ubuntu that can make your system unstable or prone to arbitrary code execution attacks if not properly secured through other means.  I personally use this type of set up for web development in a Virtual Machine and would by no means run Ubuntu this way on my daily-driver machine. Proceed with caution, but enjoy yourself :)

## Intro

Although I don't use Ubuntu as my daily-driver OS anymore (I, uh, use Arch, btw?...), I still have a love for it as it was the distro that got me into Linux in the first place.  I continue to use it for some development purposes (albeit in a VM), and I have installed it on my wife's Thinkpad as well, so Ubuntu remains relevant in my world.  Now, I am very particular about my computers and I enjoy tweaking and optimizing the OS just to my liking - and that is to be lean and as minimal as possible while allowing me to more efficiently get my work done.

Ubuntu is and always has been a great distro for Linux beginners, but over the years it has become a bit bloated in my opinion.  In this miniseries, I'll show you how to trim down the standard install in order to free up memory and CPU cycles, and to get back to a base linux experience (hint: that means we'll be removing the snap store and service!).

## A little bit of analysis

On a fresh Ubuntu install, I like to first check and see what services are running (and which ones are taking the longest to load), and start building a list of potential services I can remove.  A good tool for this is `systemd-analyze blame`. It will show you a list of services ranked by the time they took to spin up during the boot process.  On my fresh Ubuntu 20.04 install, the results look like this:

```bash
kevin@olubuntu:~$ sudo systemd-analyze blame
--> 7.703s plymouth-quit-wait.service
--> 1.088s upower.service                                       
--> 1.014s snapd.service                                        
--> 410ms avahi-daemon.service                                 
--> 347ms apport.service                                       
--> 279ms switcheroo-control.service 
--> 226ms apparmor.service    
--> 150ms snapd.apparmor.service                               
--> 96ms snap-snap\x2dstore-336.mount                         
--> 96ms snap-gnome\x2d3\x2d34\x2d1804-21.mount               
--> 87ms snap-core18-1705.mount                               
--> 82ms snap-core-8935.mount                                 
--> 77ms snap-gtk\x2dcommon\x2dthemes-1474.mount              
--> 53ms snapd.seeded.service       
--> 28ms plymouth-start.service                               
--> 27ms ufw.service                                          
--> 16ms plymouth-read-write.service                          
--> 2ms snapd.socket                                         
```

I have trimmed the output and only included services that I might be not really be interested in for my purposes:

* Plymouth - The graphical boot screen of Ubuntu
* UPower - Power management for laptops (I don't need this in a VM)
* snap - Nobody really likes snaps, including me
* Avahi - Deals with zero-config networking protocols, which I don't really use in a development environment
* Apport - Ubuntu's built-in crash reporting service
* Switcheroo - Checks if your system is running dual GPUs
* Apparmor - A Linux Security Module that hardens your system from rogue application code...chances are if you're reading this guide you can get by without it
* UFW - A firewall. I personally don't use firewalls at the PC level, but your usage may vary.

By removing these services we can trim down the Ubuntu footprint and make the system much leaner!

