---
title: "How to turn off the Error Report Dialog in Ubuntu 20.04"
date: 2020-04-22
tags: ['Linux']
author: Kevin Custer
publish: yes
excerpt: >-
  If you've ever been annoyed by the crash dialogs in Ubuntu, it's quite easy to turn them off.  This article will show you the steps to get rid of the annoyances as well as thin out your system processes.
---

The error report dialog in Ubuntu 20.04 is controlled by a package and service named `apport`.  If you want to stop the annoying crash popups, simply remove the package.

```bash
sudo apt purge apport
```

Reboot your system and you're all set!