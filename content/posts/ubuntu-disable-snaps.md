---
title: "Disabling Snaps in Ubuntu 20.10 (and 20.04 LTS)"
date: 2020-10-29
tags: ['Linux']
author: Kevin Custer
slug: disabling-snaps-in-ubuntu-20-04
publish: yes
excerpt: >-
  With the newly released Ubuntu 20.10 upon us, and the recently released LTS (20.04), many have mixed feelings about the proliferation of snap packages in Ubuntu. In this article I'll show you how to completely remove the snap system from Ubuntu if you prefer a purely apt sytem 🙂
---

## Intro

Don't get me wrong, snaps are great in theory - If you aren't familiar, a snap package is like a sandboxed application that is packaged in such a way that:

* You can be sure you're running exactly what the app developer intended, as all dependencies and assets are bundled into the snap application package
* The snap application generally doesn't own your entire system, it runs in an application sandbox of sorts
* Snaps are cross-platform and distributed independently from apt/deb packages, and as such are usually more up to date than those found in apt

Now this all sounds great, and it is in some ways (especially for app developers), but it comes at a cost: and that is generally performance and annoyances with application theming, access to user folders, and the like.  I personally find that if I want to run a sandboxed application I lean more toward Flatpak as it is more performant and seems a bit more mature than Canonical's snap system.

In any event, I usually disable snaps entirely on a fresh install of Ubuntu, and I'll show you how to do that in the new Ubuntu 20.04 release.

### UPDATES

> This guide has been updated for Ubuntu 20.10, but the steps will be applicable to 20.04 LTS as well 🙂

## 1. Remove existing Snaps

On a fresh Ubuntu install, a few snaps come preinstalled. You can see the list of them using `snap list`:

```bash
kevin@olubuntu2010:~$ snap list
Name               Version             Rev   Tracking         Publisher   Notes
core18             20200724            1885  latest/stable    canonical✓  base
gnome-3-34-1804    0+git.3556cb3       60    latest/stable/…  canonical✓  -
gtk-common-themes  0.1-36-gc75f853     1506  latest/stable/…  canonical✓  -
snap-store         3.36.0-82-g80486d0  481   latest/stable/…  canonical✓  -
snapd              2.47.1              9721  latest/stable    canonical✓  snapd
```

To remove these, you will need them using `sudo snap remove <package>`.

Run the following command to remove them all (the order of removal seems to be of importance here):

```
sudo snap remove snap-store
sudo snap remove gtk-common-themes
sudo snap remove gnome-3-34-1804
sudo snap remove core18
sudo snap remove snapd
```

Typing `snap list` now should show the following:

```bash
kevin@olubuntu2010:~$ snap list
No snaps are installed yet. Try 'snap install hello-world'.
```

## 2. Unmount the snap mount points

If running Ubuntu 20.04 LTS, you may need to perform this step.  I did not see the need on 20.10. 

#### Ubuntu 20.04 LTS

You'll need to replace the `xxxx` with the actual ID inside the `core` directory on your system, which you can find out by running `df`

```bash
sudo umount /snap/core/xxxx
```

#### Ubuntu 20.10

In Ubuntu 20.10, I found that this is now under `/var/snap`.  Simply run:

```bash
sudo umount /var/snap
```

## 3. Remove and purge the snapd package

Next, to remove the snapd package and all of its related services, run:

```bash
sudo apt purge snapd
```

## 4. Remove any lingering snap directories

Finally, you can remove the remaining snap directories on the system.  You may not have any of these directories after step 3, and that's okay.  I didn't have these directories on a fresh Ubuntu 20.04 install once snapd was removed, but your mileage may vary.

```bash
rm -rf ~/snap
sudo rm -rf /snap
sudo rm -rf /var/snap
sudo rm -rf /var/lib/snapd
```

## Gotchas

* If you are a user of the Chromium browser, you will want to add the PPAs before installing the browser, as installing the default `chromium-browser` package will automatically reinstall `snapd` ... eww! 

## Enjoy a snap-free Ubuntu

It's that simple, now your Ubuntu 20.10 / LTS 20.04 system is free of Snaps! 🙂