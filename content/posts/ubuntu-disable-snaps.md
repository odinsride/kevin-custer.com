---
title: "Disabling Snaps in Ubuntu 20.04"
date: 2020-04-20
tags: ['Linux']
author: Kevin Custer
publish: yes
excerpt: >-
  With the newly released Ubuntu LTS (20.04) upon us, many have mixed feelings about the proliferation of snap packages in Ubuntu. In this article I'll show you how to completely remove the snap system from Ubuntu if you prefer a purely apt sytem 🙂
---

## Intro

Don't get me wrong, snaps are great in theory - If you aren't familiar, a snap package is like a sandboxed application that is packaged in such a way that:

* You can be sure you're running exactly what the app developer intended, as all dependencies and assets are bundled into the snap application package
* The snap application generally doesn't own your entire system, it runs in an application sandbox of sorts
* Snaps are cross-platform and distributed independently from apt/deb packages, and as such are usually more up to date than those found in apt

Now this all sounds great, and it is in some ways (especially for app developers), but it comes at a cost: and that is generally performance and annoyances with application theming, access to user folders, and the like.  I personally find that if I want to run a sandboxed application I lean more toward Flatpak as it is more performant and seems a bit more mature than Canonical's snap system.

In any event, I usually disable snaps entirely on a fresh install of Ubuntu, and I'll show you how to do that in the new Ubuntu 20.04 release.

## 1. Remove existing Snaps

On a fresh Ubuntu install, a few snaps come preinstalled. You can see the list of them using `snap list`:

```bash
kevin@olubuntu:~$ snap list
Name               Version           Rev   Tracking         Publisher   Notes
core               16-2.44.1         8935  latest/stable    canonical✓  core
core18             20200311          1705  latest/stable    canonical✓  base
gnome-3-34-1804    0+git.2c86692     24    latest/stable/…  canonical✓  -
gtk-common-themes  0.1-30-gd41a42a   1502  latest/stable/…  canonical✓  -
snap-store         20200415.e028804  394   latest/stable/…  canonical✓  -
```

To remove these, you will need them using `sudo snap remove <package>`.

Run the following command to remove them all:

```
sudo snap remove snap-store
sudo snap remove gtk-common-themes
sudo snap remove gnome-3-34-1804
sudo snap remove core18
```

You might be wondering why I didn't remove the `core` snap...well it turns out you can't remove that one but it will get removed anyway in the next steps.

## 2. Unmount the snap core service

You'll need to replace the `xxxx` with the actual ID inside the `core` directory on your system, which you can find out by running `df`

```bash
sudo umount /snap/core/xxxx
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

## Enjoy a snap-free Ubuntu

It's that simple, now your Ubuntu 20.04 system is free of Snaps! 🙂