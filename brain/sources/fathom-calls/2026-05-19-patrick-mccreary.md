---
title: "Patrick McCreary - Sync on project fixes and plan the next steps for..."
meeting_title: "Impromptu Google Meet Meeting"
date: 2026-05-19
duration: 14
recorded_by: "Avry Stroeve"
fathom_account: avrystro@gmail.com
domains_type: one_or_more_external
transcript_language: en
participants:
  - name: "Avry Stroeve"
    email: avrystro@gmail.com
    role: internal
fathom_id: 147828370
fathom_url: https://fathom.video/calls/680065655
share_url: https://fathom.video/share/Qzk5BdKsemfyJTDg87gm7CESz9AbPdNm
tags: [ai-tools, app-development, community, digital-migration, security]
status: enriched
projects: []
captured_to: []
captured_date:
unknown_speakers: [Patrick McCreary]
related_calls: [147867022, 147866118]
---

## Summary

## Meeting Purpose

[Sync on project fixes and plan the next steps for merging code.](https://fathom.video/calls/680065655?tab=summary&timestamp=21.0)

## Key Takeaways

  - [**Blocker:** Merging 4 PRs is blocked because Patrick is on a different computer without the required local environment variables (`.env.local`).](https://fathom.video/calls/680065655?tab=summary&timestamp=462.0)
  - [**Root Cause:** The project was non-functional because a critical Supabase migration script was never run, which Avry has now fixed.](https://fathom.video/calls/680065655?tab=summary&timestamp=46.0)
  - [**Goal:** The next call will sync local (`.env.local`) and Vercel ENV variables to enable merging and unblock further development.](https://fathom.video/calls/680065655?tab=summary&timestamp=739.0)
  - [**Action:** Patrick will use his home computer for the next call, where the correct environment is configured.](https://fathom.video/calls/680065655?tab=summary&timestamp=490.0)

## Topics

### Problem: Blocked Code Merge

  - [Merging 4 PRs with bug fixes is blocked.](https://fathom.video/calls/680065655?tab=summary&timestamp=90.0)
  - [**Reason:** Patrick is on a different computer that lacks the necessary local environment variables (`.env.local`).](https://fathom.video/calls/680065655?tab=summary&timestamp=462.0)
  - [**Impact:** This prevents running local commands (e.g., `cat .env.local`) needed to inspect the current configuration.](https://fathom.video/calls/680065655?tab=summary&timestamp=462.0)

### Solution: Environment Sync

  - [The next call will focus on syncing environment variables to unblock development.](https://fathom.video/calls/680065655?tab=summary&timestamp=739.0)
  - [**Process:**](https://fathom.video/calls/680065655?tab=summary&timestamp=739.0)
    1.  [Patrick will use his home computer.](https://fathom.video/calls/680065655?tab=summary&timestamp=490.0)
    2.  [Merge the 4 PRs locally.](https://fathom.video/calls/680065655?tab=summary&timestamp=739.0)
    3.  [Compare local (`.env.local`) and Vercel ENV variables.](https://fathom.video/calls/680065655?tab=summary&timestamp=753.0)
    4.  [Identify and add any missing variables.](https://fathom.video/calls/680065655?tab=summary&timestamp=753.0)
  - [**Known Gap:** A `resend` variable in Vercel is likely unset. This variable is required for the email-based login code feature.](https://fathom.video/calls/680065655?tab=summary&timestamp=765.0)

### Context: Project Status & Security

  - [**Root Cause Identified:** The project was non-functional because a critical Supabase migration script was not run. Avry has since executed it.](https://fathom.video/calls/680065655?tab=summary&timestamp=46.0)
  - [**Security Concern:** The `cateringbyrm.com` login is currently insecure (email-only) for testing.](https://fathom.video/calls/680065655?tab=summary&timestamp=639.0)
  - [**Risk:** This setup could expose sensitive financial data to unauthorized users.](https://fathom.video/calls/680065655?tab=summary&timestamp=649.0)
  - [**Plan:** The login will be locked down with more robust authentication after testing is complete.](https://fathom.video/calls/680065655?tab=summary&timestamp=649.0)

## Next Steps

  - [**Patrick:**](https://fathom.video/calls/680065655?tab=summary&timestamp=515.0)
      - [Use home computer for the next call.](https://fathom.video/calls/680065655?tab=summary&timestamp=490.0)
      - [Notify Avry when available, targeting a call before 3:30 PM today.](https://fathom.video/calls/680065655?tab=summary&timestamp=515.0)
  - [**Avry:**](https://fathom.video/calls/680065655?tab=summary&timestamp=825.0)
      - [Initiate the next call once Patrick is ready.](https://fathom.video/calls/680065655?tab=summary&timestamp=825.0)


## Action Items

*No action items*

## Transcript

**Patrick McCreary** (00:00:00)
What's up, brother? How are you? My Costa Rican amigo. How are you? I'm okay. I'm doing pretty good, man. I'm just fighting a cold.

**Avry Stroeve** (00:00:12)
I'll send you a secret road potion remedy right after we're off this call.

**Patrick McCreary** (00:00:17)
Yeah. Okay. I'll check it out, man. So you were able to get it working, like, no problem? Basically.

**Avry Stroeve** (00:00:24)
So I'll screen share and show you. And then I have a set of steps that we can do on this call, just a quick agenda to make it super efficient. But yeah, so basically, let's see. Okay. So basically in your repo here, app.rmc, this is the brain folder that I'm working in. But in your Supabase, like, thing, you had a migration script that was going to be ran. And you were probably already doing a lot of these for the project. This is for... The other guy. So let me just let it switch. Okay. BondBion's project. So I basically, in your tables right here, one of the reasons that it wasn't working was because there was a script from your code that you didn't run properly or that just didn't get ran. Not you in particular. I'm not throwing shade at you. So I'm just like, there wasn't, there wasn't, so basically we just had to run that. And then we also like went through and found a few bug fixes that I put into four different PRs. So if you actually, basically what, what we're going to do real quick is I just need you to, on your end, open up, well, we're going to look at Vercel and the ENV variables. But before that, so I need you to open up your clot if you can. And I'm going to send you this prompt, and if you can screen share on your side of things, this is the prompt that you're going to send into your either cloud or OpenAI codex. It doesn't really matter which one, but we're going to merge the code changes, the simple PRs. Hello,

**Patrick McCreary** (00:04:07)
Are you there? Sorry, I lost you. No, you're all good.

**Avry Stroeve** (00:04:10)
Okay, I was to share that screen.

**Patrick McCreary** (00:04:12)
Can you see anything? No.

**Avry Stroeve** (00:04:16)
Try it one more time with the entire screen.

**Patrick McCreary** (00:04:25)
Entire screen? Okay. Yeah. Okay, I put that prompt in, Claude. Okay, sounds good. Locked in.

**Avry Stroeve** (00:04:43)
Let's nail the pre-play before we touch a single PR. Quick heads up. Feel free to actually redact secret values before pasting only variable names, which environment? They set in production. Let me just double check because that might be a step for cell constraint. My cell plan is high. Up tier blocks deployed from non-owners for each PR, show me the URL walking through, refer Vercel deploy before we start, tell me to run the cat, ENV, and my processor, tell me to run Vercel, ENV is after Vercel login, it's docs, Vercel, and my repo report missing, Vercel, and ENV variables. Okay, so it basically said back to us, so the Vercel, locked in, let's nail it. Okay, so run these, then paste me the inputs. So yeah, can, you're, you're, okay, try that again. Like, do that one more time. No such file directory, which also probably is because you're not in the proper directory. So basically, you just need to tell it to go, I need you to tell, I need you to give me the script to CD, like literally the letter CD. I need you to give me the script. The CD into the proper working directory before we get the ENV local variables. And do you usually use Claude or Codex? Codex. Oh, also you have right now over code. Before we get the what? Well, run. So I wouldn't run this in chat because it's not going to be able to help you. We should run this in Codex.

**Patrick McCreary** (00:06:33)
I use them both. I mean, it should be fine. Before we get the what? Okay.

**Avry Stroeve** (00:06:39)
Well, let me just try this again. Yes, in code. You're going to need to be in code, not chat. Okay. See, and then, or you can be in Codex or you can be in Claude, but just in the coding. And coding agent is essentially what I wanted to say. But yeah, this is perfect. This is good. Boom.

**Patrick McCreary** (00:07:14)
Cool.

**Avry Stroeve** (00:07:16)
Also, yeah, I'll use GitHub workflow for the PR scene, but first I'm going to check the local repo docs and in base shape, and I'll avoid repeating secret values back all in report names that are missing or lock sale. Cool. I'm not saying I'll use the GitHub workflow into the current workspace yet. The only repo-like folder here is rmcopsharness. Okay. Let's see if you've given it GitHub. Quick snag, this machine shell does not have G8 orb or cell on path, and the current folder does not contain hard repo. We can still read the PR. I'm on a different computer.

**Patrick McCreary** (00:07:52)
I'm not at home.

**Avry Stroeve** (00:07:55)
You want me to edit or cell real quick and get logged in? Well. Oh, it's still... Ah, okay. I see now. Yes, we probably... The thing is, on your computer at home, you have the ENV variables, which are environmental variables for this specific project, and this computer doesn't have them. So you're basically, like, starting from the same place I'm starting from, in terms of, in terms of, like, being able to do any development side of things.

**Patrick McCreary** (00:08:34)
So... Are you going to be around in an hour? Yeah.

**Avry Stroeve** (00:08:38)
Maybe not in an hour, but definitely two. Okay.

**Patrick McCreary** (00:08:42)
Just tell me what time, and I'll make sure... Oh, well, at five, I have a dentist appointment with my son, with Rex. Yeah. So... You say your son, like, I don't know who he is.

**Avry Stroeve** (00:08:54)
Yeah, I know.

**Patrick McCreary** (00:08:55)
I know. You talk so business-like. But no, you think... You can call me before like 3.30, like around 3.30? Yes.

**Avry Stroeve** (00:09:06)
Let me just double check. So 3.30, we're both on the same time. The only thing is I have a call at 3.

**Patrick McCreary** (00:09:14)
I might even be back by 3. Okay.

**Avry Stroeve** (00:09:17)
Sounds good. The only thing is I have a call at 4, so I'm probably going to try and head home. I have a call at 4 and then another call from 5 to 7, and then another call at 3.

**Patrick McCreary** (00:09:30)
Look at you. Yeah.

**Avry Stroeve** (00:09:36)
So if I can't do that, how late are you usually up?

**Patrick McCreary** (00:09:44)
I'm only up until 9, but I wake up every day about 5. Okay. So you saw my voicemails at like 6 a.m.

**Avry Stroeve** (00:09:50)
this morning?

**Patrick McCreary** (00:09:51)
Yeah, I saw it, but I was so busy. That was so long. No, you're good.

**Avry Stroeve** (00:09:55)
I was up until 6 this morning working on it.

**Patrick McCreary** (00:10:00)
God, Avry, what do you see?

**Avry Stroeve** (00:10:03)
Well, I was like, , I spent the whole weekend, I was fixing my bike and so, or like trying to figure it out. was also in a totally separate part of the, like Costa Rica. I was like, , I haven't made any progress on, on this. I need to  lock in. So I was up, like figuring it out, but it's all good. And actually the next, I'll show you this just so you know. Um, so basically what we did is, uh, so this is how your flow is going to work. Um, you basically, the user is going to be on RMC Inventory. You have the, they, they have to log in via their email, which I'm going to open this just so you can see, um, other things I've noticed. Um, so this isn't really secure at all because I don't really need it to be that secure, do I? I mean, you should at least have this hidden behind the authentication of, because this is like receipts, this is money that you're making, your accountants are going to be in here. Yeah, okay. But basically, like when you scan, purchase like all of this, I don't even think I can.

**Patrick McCreary** (00:11:20)
Don't you like my UI? Isn't my UI beautiful? It's pretty , it's badass. I designed that . That looks nice. Let's go. I've coded that by  getting like, get rid of this, get rid of that, get rid of this, get rid of that. That's all I said like a hundred times. Yeah.

**Avry Stroeve** (00:11:39)
Cateringbyrm.com. then you just have like, anybody can log in if they just know this.

**Patrick McCreary** (00:11:44)
I mean, we're testing it right now. So I'm trying to make sure it's easy for people to log in and use, and then we'll lock you down later. Yes.

**Avry Stroeve** (00:11:52)
Okay. So yeah, after the whole scan purchases like works, then this is the voice flow. Okay. Which I haven't even looked into that, but I'm assuming you're probably going to want to make sure this works as well, unless you've already validated that it works.

**Patrick McCreary** (00:12:11)
It's pretty clear. I felt like that was working. Okay. Yeah. But we might have to test it.

**Avry Stroeve** (00:12:19)
I mean, yeah, once I, once I, so the point of this call, when we get on the next call is we'll look, we'll, first of all, we'll merge the PRs on your computer that has the ENV variables in the code already on your computer. And then we will look through the ENV.local file on your computer, which is where your environmental variables are. And we will see which ones you currently have set and which ones you don't. And then we'll also cross-reference that with Vercel to just make sure that you have, because I'm, I looked at it and there's a resend. Do you know what, did, did they tell you about what resend was?

**Patrick McCreary** (00:12:58)
No.

**Avry Stroeve** (00:12:59)
Okay. You have a resend variable in there, but I don't think it's set. And that allows your staff to get an email for a logging code, which is what you were originally thinking.

**Patrick McCreary** (00:13:13)
So that and then, yeah, just like a few things.

**Avry Stroeve** (00:13:18)
So I'm like really excited, but I just need the environmental variables to like keep working on it. But yeah, it'll be, it'll be worked within like 24, 48 hours, at least for the basic foundations. And then you'll probably want to keep testing it and find bugs essentially, and then we can fix them in real time.

**Patrick McCreary** (00:13:41)
Okay. Awesome, man. Well, very cool. Thanks, Avery. Appreciate it. Yeah.

**Avry Stroeve** (00:13:45)
Just let me know when you're back home and then I'm going to head home so that I can be hopefully on that call in like an hour with you.

**Patrick McCreary** (00:13:52)
All right. Perfect. All right, man. I'll see you soon.

**Avry Stroeve** (00:13:55)
Love you. Love you.

**Patrick McCreary** (00:13:57)
Thanks for all this hard work. See you, man. Bye.
