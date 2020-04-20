---
title: "Disabling the Plymouth Boot Screen in Ubuntu 20.04"
date: 2020-04-21
tags: ['Linux']
author: Kevin Custer
publish: yes
excerpt: >-
  The Plymouth boot screen is part of what gives Ubuntu a look of its own.  But is it really necessary? If you enjoy stripping your Ubuntu install down to the core, look no further!
---

## Intro

The Plymouth boot screen is that nice purple splash screen you see when booting into Ubuntu.  As nice as it may look, it can cause the system to boot up a bit slower. Here's how to disable it!

## 1. Edit grub config

In your editor of choice, open the `/etc/default/grub` file with `sudo`.

Find the `GRUB_CMDLINE_LINUX_DEFAULT` line, and you will see:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

To disable the boot screen, simply remove the word `splash` from this line, like so:

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

## 2. Update grub

In order to apply the config changes to the grub bootloader, run the following command:

```bash
sudo update-grub
```

Now reboot your system!

## 3. Uninstall plymouth

Finally, uninstall the plymouth package from your system:

```bash
sudo apt purge plymouth
sudo apt autoremove
```

## 4. Remove lingering config directories

Remove the following directory:

```bash
sudo rm -rf /usr/share/plymouth
```

... and we're done! We don't need pretty boot screens around these parts 🤠