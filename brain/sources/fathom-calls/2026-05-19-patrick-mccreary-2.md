---
title: "Patrick McCreary - Troubleshoot Vercel deployment issues for the RMC..."
meeting_title: "Impromptu Google Meet Meeting"
date: 2026-05-19
duration: 10
recorded_by: "Avry Stroeve"
fathom_account: avrystro@gmail.com
domains_type: one_or_more_external
transcript_language: en
participants:
  - name: "Avry Stroeve"
    email: avrystro@gmail.com
    role: internal
fathom_id: 147866118
fathom_url: https://fathom.video/calls/680163271
share_url: https://fathom.video/share/VyMKubj9NoB2mysRWSLv_yuUXsx2yDBn
tags: [ai-tools, app-development, content-strategy]
status: enriched
projects: []
captured_to: []
captured_date:
unknown_speakers: [Patrick McCreary]
related_calls: [147867022, 147828370]
---

## Summary

## Meeting Purpose

[Troubleshoot Vercel deployment issues for the RMC Inventory Control app.](https://fathom.video/calls/680163271?tab=summary&timestamp=493.0)

## Key Takeaways

  - [**Deployment Blocked:** Vercel deployments are failing because environment variables (`.env.local`) are missing from the project configuration.](https://fathom.video/calls/680163271?tab=summary&timestamp=493.0)
  - [**Vercel Access Restored:** Resolved a Vercel login issue by navigating directly to the project dashboard, bypassing the broken CLI authentication flow.](https://fathom.video/calls/680163271?tab=summary&timestamp=463.0)
  - [**Path to Launch Defined:** A three-step plan was set: 1) Merge PRs, 2) Sync ENV variables, and 3) Avry to run final tests before a staff rollout.](https://fathom.video/calls/680163271?tab=summary&timestamp=526.0)

## Topics

### Vercel Deployment Failure

  - [**Problem:** All recent deployments in Vercel are blocked.](https://fathom.video/calls/680163271?tab=summary&timestamp=493.0)
  - [**Root Cause:** The project is missing required environment variables, which are defined in the local `.env.local` file but not synced to Vercel.](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)
  - [**Troubleshooting Path:**](https://fathom.video/calls/680163271?tab=summary&timestamp=231.0)
      - [**Initial Attempt:** Use the Codex-provided script to sync variables, which failed due to a Vercel CLI login error.](https://fathom.video/calls/680163271?tab=summary&timestamp=231.0)
      - [**Successful Workaround:** Bypassed the CLI by logging into Vercel via the web browser and navigating directly to the project dashboard.](https://fathom.video/calls/680163271?tab=summary&timestamp=463.0)

### Resolution Plan

  - [**Goal:** Unblock deployments and prepare the app for a staff rollout.](https://fathom.video/calls/680163271?tab=summary&timestamp=526.0)
  - [**Step 1: Merge PRs (Owner: Patrick)**](https://fathom.video/calls/680163271?tab=summary&timestamp=579.0)
      - [Patrick will merge all pending Pull Requests.](https://fathom.video/calls/680163271?tab=summary&timestamp=579.0)
  - [**Step 2: Sync ENV Variables (Owner: Both)**](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)
      - [Both will sync the local `.env.local` file with the Vercel project's environment variables.](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)
  - [**Step 3: Final Test & Rollout (Owner: Avry)**](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)
      - [Avry will add personal OpenAI and Google API keys to Vercel for testing.](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)
      - [After a successful test, the app will be rolled out to staff.](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)

## Next Steps

  - [**Patrick:** Merge all pending PRs.](https://fathom.video/calls/680163271?tab=summary&timestamp=579.0)
  - [**Patrick & Avry:** Schedule a follow-up to sync environment variables.](https://fathom.video/calls/680163271?tab=summary&timestamp=526.0)
  - [**Avry:** Add personal API keys to Vercel and run final tests before staff rollout.](https://fathom.video/calls/680163271?tab=summary&timestamp=540.0)


## Action Items

*No action items*

## Transcript

**Patrick McCreary** (00:00:46)
What am I sharing? Is this the codex?

**Avry Stroeve** (00:00:50)
Yeah, codex. I'm resetting. I was back to the PR workflow, and I'll ignore the side conversation. I'll recheck because of PR page. Okay, so it said current screen is Google Meet, and I can see Avery is on the clock. What? That's cool. Wait a minute. What did you set up on your thing? I have no idea.

**Patrick McCreary** (00:01:37)
It's watching you, just so you know.

**Avry Stroeve** (00:01:39)
All right. Well, so CD. Wait, can you go up a little bit? Okay, so it's saying, okay, so if you go into your file folder on your computer, are you sharing your entire screen? Okay. No, I think I'm just sharing this.

**Patrick McCreary** (00:02:02)
Hold on, me.

**Avry Stroeve** (00:02:16)
Okay, and then can you go into your file system, which is Finder? Okay. And then go into RMC, which is the folder.

**Patrick McCreary** (00:02:30)
Okay.

**Avry Stroeve** (00:02:32)
And then, okay, so RMC documents, which is click command shift, command shift period, and then go to... Let's see if we can find documents. Also, it's... Okay, there it is. Documents. Okay. And then, can you actually, on the top, there's, like, different icons for, like, list view. Can you change it to the one right, one more over? That one? Yeah, that one. I like that view way better. It helps me understand. Okay. So GitHub, we're looking for GitHub, which is right there. And then you go into RMC Inventory Control 2, and then we're going to go to ENV Local, which is a .file, which is hidden. It's one of the grayed-out ones, so we just have to look for the ENV Local, which is up top, actually. I just saw it. Cool. And then, okay, cool. So I think if you click it, you have the permissions locked, so you're not going to be able to open it, but try it. Okay, yeah, never mind. So go ahead and click the copy, where it says the command. On Codex, on Codex. Go to Codex and say copy? Sorry, go to Codex and then click the copy button on the script it told you to run, essentially, in the top. Yeah, yeah.

**Patrick McCreary** (00:04:14)
And then terminal and then run that. Codex is going to do it.

**Avry Stroeve** (00:04:23)
Cool. Or you could probably tell Claude just to open it for you.

**Patrick McCreary** (00:04:44)
Actually, I think I have this done through my GitHub. Hold on.

**Avry Stroeve** (00:04:53)
You can't. It's both. So it's going to want you to log into Vercel. Oh, it is. Yeah. Or, oh, I see what you're saying. You mean login with GitHub? Yeah. I see. And then I think you just have to click allow. Okay, cool. So, um, Vercel currently has these ENV variables, which we can honestly, we can search. If you, can you go to Vercel on your computer? Yeah.

**Patrick McCreary** (00:06:20)
Oh, shoot. I should have written down that code, shouldn't I?

**Avry Stroeve** (00:06:24)
It's okay. I'll just say login to Versa. Well, wait, wait. So what just happened? Enter the code from your device to us and could not verify.

**Patrick McCreary** (00:06:37)
Yeah. Let me, hold on. Let me get this call. Hey, Rich. You're there? Okay. Good job, man. All right. Let me know. Call me if you have any questions, okay? Damn, dude. I'm glad everything's okay. Yeah. All right. Have a good appointment. Love you. Just be like, I'm checking in for my 4 o'clock appointment and tell them your name. Okay. All right. Love you. Bye. Thank you. We'll be back. Okay.

**Avry Stroeve** (00:07:10)
I'm sorry. No, you're good. So I think it's just going to send you a new code from your Vercel. So it's just going to, like, on your phone. It's awaiting code display request details. So... I have a Vercel on my phone. What is it?

**Patrick McCreary** (00:07:30)
I said I don't have a Vercel on my phone. Enter the code from everybody's.

**Avry Stroeve** (00:07:43)
Try and maybe log in again. Maybe just search for Vercel one more time.

**Patrick McCreary** (00:07:51)
Oh, this says I'm logged in.

**Avry Stroeve** (00:07:57)
I don't Does it let you... Wait. Yeah, yeah, yeah. Go to the overview real quick, and then see if you can get into your project, because if you can click on that. Oh, yeah. Okay, cool. So then we want to go to, let just see, deployments, which is in the left, left-hand side, top, top left-hand side, deployments. And then, okay, so all of those, yep, those were all blocked, which makes sense. So that's one thing, and then the other thing, let me just double check on my end here. Okay, so I'm just now realizing, I don't think we're going to have enough time to fully get everything I need, but basically there's just three things that we need to do whenever we can connect. One is we'll merge those PRs. Two, we need to make sure that ENV variables on Vercel and in your files are set up and see which ones are missing. And then three is we need to, well, I need to set up a ENV variable for each one for myself. So that's just OpenAI and Google. And then I'll be able to actually test everything one more time, and then we can push it out to your staff. Okay.

**Patrick McCreary** (00:09:33)
I'll be around, man. Okay.

**Avry Stroeve** (00:09:35)
Cool. Okay. Sounds good. Awesome, man. Hey, I can merge the PRs.

**Patrick McCreary** (00:09:40)
Do you want me to do that? Yes.

**Avry Stroeve** (00:09:43)
Yes, definitely. Go ahead and merge the PRs. Okay. And the only other thing is we'll just go through the ENV variables together, and then I can go through a test, and then we can push it out. Awesome.

**Patrick McCreary** (00:09:59)
Cool. Thanks, Avry. Appreciate it, man.

**Avry Stroeve** (00:10:02)
Mm-hmm. All right. Love you. Hope soon. Bye-bye.
