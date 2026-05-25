---
title: "Patrick McCreary - Generate and share API keys for developer setup."
meeting_title: "Impromptu Google Meet Meeting"
date: 2026-05-21
duration: 83
recorded_by: "Avry Stroeve"
fathom_account: avrystro@gmail.com
domains_type: one_or_more_external
transcript_language: en
participants:
  - name: "Avry Stroeve"
    email: avrystro@gmail.com
    role: internal
fathom_id: 148300350
fathom_url: https://fathom.video/calls/682013994
share_url: https://fathom.video/share/K2oBEedxVTe8DxXiGZJmacTXPVKshaTP
tags: [ai-tools, app-development, security]
status: enriched
projects: []
captured_to: []
captured_date:
unknown_speakers: [Patrick McCreary]
---

## Summary

## Meeting Purpose

[Generate and share API keys for developer setup.](https://fathom.video/calls/682013994?tab=summary&timestamp=48.0)

## Key Takeaways

  - [**API Key Generation:** Generated new, personal API keys for OpenAI, Resend, and Google Cloud (Vision & Document AI) to enable individual cost tracking.](https://fathom.video/calls/682013994?tab=summary&timestamp=60.0)
  - [**Project Misconfiguration:** Discovered the app was using Google Cloud Vision in the `my-first-project` project, not the intended `inventory-control-ocr` project, explaining why Document AI was never enabled.](https://fathom.video/calls/682013994?tab=summary&timestamp=927.0)
  - [**Environment Variable Recovery:** Recovered the local `.env.local` file, which was accidentally wiped by a Vercel CLI pull, using the Codex AI's session memory.](https://fathom.video/calls/682013994?tab=summary&timestamp=3181.0)
  - [**Key Consolidation:** Consolidated all required environment variables into a single `.env.local` file for Avry's local setup, bypassing the need for a separate `developer.env` file.](https://fathom.video/calls/682013994?tab=summary&timestamp=2595.0)

## Topics

### Project & API Discovery

  - [**Initial Goal:** Generate a Google Cloud Document AI API key.](https://fathom.video/calls/682013994?tab=summary&timestamp=455.0)
  - [**Discovery:** The Document AI API was not enabled in the `inventory-control-ocr` project.](https://fathom.video/calls/682013994?tab=summary&timestamp=804.0)
  - [**Root Cause:** The app was incorrectly using Google Cloud Vision in the `my-first-project` project.](https://fathom.video/calls/682013994?tab=summary&timestamp=927.0)
  - [**Decision:** Consolidate all work into `my-first-project` to avoid further confusion.](https://fathom.video/calls/682013994?tab=summary&timestamp=1200.0)

### Environment Variable Recovery

  - [**Problem:** A Vercel CLI pull command accidentally wiped the local `.env.local` file.](https://fathom.video/calls/682013994?tab=summary&timestamp=3181.0)
  - [**Solution:** The Codex AI assistant recovered the file's contents from its session memory.](https://fathom.video/calls/682013994?tab=summary&timestamp=3431.0)
  - [**Verification:** A screenshot confirmed the file was blank before recovery.](https://fathom.video/calls/682013994?tab=summary&timestamp=3780.0)
  - [**Outcome:** The `.env.local` file was restored, including the `Google Document AI Processor Name` key that was nearly lost.](https://fathom.video/calls/682013994?tab=summary&timestamp=3431.0)

### API Key Generation & Consolidation

  - [**OpenAI:** Generated a new key (`Avery-Dev`) for personal use.](https://fathom.video/calls/682013994?tab=summary&timestamp=120.0)
  - [**Resend:** Generated a new key (`Avery-Dev`) for personal use.](https://fathom.video/calls/682013994?tab=summary&timestamp=3843.0)
  - [**Google Cloud:**](https://fathom.video/calls/682013994?tab=summary&timestamp=4371.0)
      - [Enabled Vision API and Document AI API in `my-first-project`.](https://fathom.video/calls/682013994?tab=summary&timestamp=4371.0)
      - [Created a service account (`Avery-Dev`) with two roles:](https://fathom.video/calls/682013994?tab=summary&timestamp=4656.0)
          - [`Cloud API Gateway Service Agent`](https://fathom.video/calls/682013994?tab=summary&timestamp=4680.0)
          - [`Cloud API Management Service Agent`](https://fathom.video/calls/682013994?tab=summary&timestamp=4716.0)
      - [Created a new API key (`Avery-Dev`) restricted to the Vision and Document AI APIs.](https://fathom.video/calls/682013994?tab=summary&timestamp=4758.0)
  - [**Consolidation:** Avry will use the single, restored `.env.local` file for local development.](https://fathom.video/calls/682013994?tab=summary&timestamp=2595.0)

## Next Steps

  - [**Patrick:**](https://fathom.video/calls/682013994?tab=summary&timestamp=425.0)
      - [Text Avry the new OpenAI, Resend, and Google Cloud API keys.](https://fathom.video/calls/682013994?tab=summary&timestamp=425.0)
  - [**Avry:**](https://fathom.video/calls/682013994?tab=summary&timestamp=2451.0)
      - [Set up the local development environment using the provided `.env.local` file and new keys.](https://fathom.video/calls/682013994?tab=summary&timestamp=2451.0)
  - [**Both:**](https://fathom.video/calls/682013994?tab=summary&timestamp=2451.0)
      - [Rotate all production API keys for security after Avry's work is complete.](https://fathom.video/calls/682013994?tab=summary&timestamp=2451.0)


## Action Items

*No action items*

## Transcript

**Avry Stroeve** (00:00:00)
You're in the wrong country for that.

**Patrick McCreary** (00:00:03)
Yeah.

**Avry Stroeve** (00:00:05)
How are you?

**Patrick McCreary** (00:00:06)
Good. Good. Hey, your aunt asked for your address. Okay.

**Avry Stroeve** (00:00:11)
I just saw that text, actually. Will you text it to her? Well, the thing is, I'm not going to, well, it's like I'm in a tiny home on a farm. So, yeah, it doesn't actually exist. But the farm does. So, I can figure, or I can just get it delivered to my friends. I'll ask him. No. Let me, I'll text her as soon as we're done with this call. Okay, cool. Okay, so, basically, like, when we know we're finished with this call will be when I get a few ENV variable keys. So, we'll just work through those. The first one is the OpenAI key. So what you need to do is go to your OpenAI API key dashboard.

**Patrick McCreary** (00:01:24)
So like.

**Avry Stroeve** (00:01:25)
And then actually, so share your screen so I can see what's going on. Something else running over here on the side, by the way.

**Patrick McCreary** (00:01:50)
Okay. So. Can I go in here? In codex?

**Avry Stroeve** (00:01:58)
Wait. So you basically. What we're going to do, no, because you're going to create me new ones so that we can actually, like, work like a proper development team where we each have our own keys so that you can keep track of it. So you need to go to a new tab on Chrome and do platform.openai.com. This is their API platform. Increase this. Okay. Okay. And then you need to sign in with whatever you signed in with. There's a little gecko climbing up this wall. How cool is that?

**Patrick McCreary** (00:02:40)
So what kind of farm are you on?

**Avry Stroeve** (00:02:43)
This one, the land is, and then go to API keys on the left-hand side. The land is, or create API key is good. They have animals and everything, and then they are, they have, like, fruit trees, and then they're building a whole, yeah, name it, Avery-Dev.

**Patrick McCreary** (00:03:12)
Can you send this one for your name?

**Avry Stroeve** (00:03:14)
Or, sorry, Avery-Dash instead of Slash. Hi, Aunt Jocelyn. I'll send you, I'll send you my address as soon as I'm, as soon as I'm done. He doesn't have to address.

**Patrick McCreary** (00:03:28)
Please forgive me for being horribly late. I don't, I don't. Horribly. It's okay. I'm probably the worst and known in mankind. Nope. And I apologize. You're, you're okay.

**Avry Stroeve** (00:03:44)
No worries at all.

**Patrick McCreary** (00:03:50)
Whoa, what did I do there?

**Avry Stroeve** (00:03:53)
Um, you're just, you're basically just screen sharing the screen, the screen share. You're basically screen sharing the screen share. So basically just go back to your other, like you can just go to Codex where you just were, and it'll, yeah.

**Patrick McCreary** (00:04:17)
Oh, okay.

**Avry Stroeve** (00:04:19)
And then go to platform, or like platform.api, yep.

**Patrick McCreary** (00:04:25)
Avry-dev, cool, create secret key. Create secret key, okay.

**Avry Stroeve** (00:04:31)
And then you want to copy that, and do you have a password manager, by the way?

**Patrick McCreary** (00:04:37)
You know, the, the Apple keys one down here, see it? Okay, yeah. Yeah.

**Avry Stroeve** (00:04:44)
Cool. I would say it's like always best practice to save all your API keys and keep track of them. So I would create a new, new folder or new shared, yeah. You can create a. So, okay, maybe it won't. Down there, it says shared groups, but I don't think you'll be able to create a new shared group. So just create a new API key, I guess. That's fine. It might be able to, like, a, you just go to the same spot, plus button in the middle, top right, middle, middle, top right. Move passwords to, okay, just create a new password, it's fine. It's, I want to, I like being organized with the groups, but if you can't do it, it's fine. And then name it, OpenAI, API key, Avery, dash dev, API key, Avery, dash dev, and then say the date is 5, 20, 20, 26. Okay.

**Patrick McCreary** (00:05:53)
Yep. Cool.

**Avry Stroeve** (00:05:55)
And then change the group from, or click.

**Patrick McCreary** (00:06:00)
Yeah, it's not shared.

**Avry Stroeve** (00:06:03)
And then go into the top where it says password. And then is that, that is not it. Command B. There it is.

**Patrick McCreary** (00:06:15)
Cool.

**Avry Stroeve** (00:06:16)
And then, yep. And then save. Are you sure you want to save this password without a website? Yes, that's fine. Okay, cool. So, and then I can figure out how you can make a new group. I don't know why. But, oh wait, if you click the X on the stripe.com in the top right, click the X button top right, like all the way over to the right, and then click the X, does it let you, okay, add the menu bar, maybe click edit in the right hand, right hand panel next to the search bar, there's an edit button. Okay, whatever. It's not, it's not that big of a deal. I thought maybe. You can create a group in My Password Manager, you can, but it's totally fine, just as long as you save it. And then send that to me via text, and just let me know in the text.

**Patrick McCreary** (00:07:12)
Or just the password.

**Avry Stroeve** (00:07:15)
Just the API key is good. Okay, and then can you just say open, just like type the word open, and then an upward arrow, just so I remember. Shifts, shift six, shift and then number six, enter, cool, and then the next one is going to be Google, so let me get the steps for those.

**Patrick McCreary** (00:08:02)
Okay. Google Cloud? Yeah.

**Avry Stroeve** (00:08:19)
So, yep, Google Cloud and then Console right there. Oh, yeah.

**Patrick McCreary** (00:08:26)
Yeah, yeah, I understand. Try it in Console.

**Avry Stroeve** (00:08:31)
Okay. So go to the Inventory Control OCR or click the project name. Okay, yeah, you're there. And then so the first thing that we're going to do is the Document AI Processor Names in the left hamburger menu. Scroll down to Document AI. Is there a Document AI?

**Patrick McCreary** (00:08:59)
Sure. Sure. Sure.

**Avry Stroeve** (00:09:00)
Somewhere, maybe in the, like, My Processors. Hmm. Where is it? View all products all the way down at the bottom, bottom.

**Patrick McCreary** (00:09:19)
Okay.

**Avry Stroeve** (00:09:20)
And then in the, so let's look for APIs.

**Patrick McCreary** (00:09:28)
Let me just ask.

**Avry Stroeve** (00:09:33)
Okay. Oh, yeah, yeah, yeah. So we can just, in the search bar on the top, we can just search for document API or document AI. In the top search bar, like, all the way up. Yep. Search. That thing. Document AI. And then click the first one. Document AI. And then we're going to. One Explore Processors, Create Custom Processor, so click the one name, Invoice Parser, that's what we're looking for, Invoice Parser, Invoice Parser, Processor List shows, click the one, okay, I think if you go back to document. This one, or did you see this one? No, so click out of that in the right-hand side, and then, okay, so click on My Processors, which is in the left-hand side, My Processors, and then we're looking for Invoice Processor. So scroll up real quick. Pricing, cloud document. Okay, so we're in the inventory control, but apparently it's not enabled. This process list shows, I click the one there, at the top of the process page, you'll see a header, find the ID value. Let me just say that Patrick's existing for sales here, invoker, service account already works. could just create a signal instead of making every demo, Patrick Williams, cloud, account, choose, let me read account. Okay. Okay. Um, so the document AI processor or the document AI API is not, if, can you scroll up real quickly? Can you scroll up just a little bit? All the way up. Scroll up one more time. The cloud document. Oh, wait, wait, wait. Here, go, go, go back. Back, okay.

**Patrick McCreary** (00:12:17)
Back arrow.

**Avry Stroeve** (00:12:19)
And then, is there any way you can expand your screen a little bit more? Okay, thank you. So, document.ai, and then let me take a screenshot of where we currently are on my screen, and then let me just click this, copy, AI API, okay. What are you working on in the other chat while this one...

**Patrick McCreary** (00:13:07)
Oh, it's the child support modification. Fun stuff. nice.

**Avry Stroeve** (00:13:12)
Claude does child support now. love it.

**Patrick McCreary** (00:13:14)
Yeah, yep.

**Avry Stroeve** (00:13:19)
Should be there. Click on it. You'll see the processor name. Okay, so go to my processors one more time. And then it's not enabled, which is important. So let me just take a screenshot of this. So you might have, it might have given you a recommendation, but you never enabled it is my hypothesis right now. But what... You know what I recall?

**Patrick McCreary** (00:13:51)
Yeah. could sworn early on, it told me to use CloudVision. He said it...

**Avry Stroeve** (00:13:59)
I Do

**Patrick McCreary** (00:14:03)
Should I click on that and see if we're even using it? yeah. Yeah.

**Avry Stroeve** (00:14:11)
Cloud Vision and then scroll up really quickly and see if it's enabled. Okay. That one's not enabled either. So let me just ask it. Cloud Vision. Maybe, potentially, it could be that we're in your... Can you click on the top left, the inventory control OCR and see what other projects you have? Catering. Okay. So, yeah, it would definitely be the inventory controls OCR.

**Patrick McCreary** (00:14:39)
think.

**Avry Stroeve** (00:14:40)
Check, click on my first project and see if...

**Patrick McCreary** (00:14:45)
See if... Oh, that's true.

**Avry Stroeve** (00:14:48)
Oh, so, okay. So it might be in a completely different project. Can you click the back arrow in the top left real quick? And then can you click... Yeah, back arrow. Oh, wait. So you basically click on, it just changed your project back actually to the inventory control OCR over the other project that you have. So go back up to the inventory control OCR project, click on my first project, and then go back up to the waffle icon in the top left, and then APIs and services, and then enabled APIs and services. And let's just see, okay, so wow, so I'm pretty sure, and then go to credentials, actually, okay, Cloud Vision, yep, that makes sense. So I'm pretty sure you set up a project for the inventory control, yet you ended up creating the API keys and everything in my first project. So let me just let it know this. Every single OCR call in production for the last week, use Google Cloud Vision OCR. Document AI has never been turned on. It's never been enabled. Okay, what does this mean? Cloud Vision is already enabled in prod. Skip the service accounts. Jason, skip it up entirely. Don't need it for Vision. For every dev, just skip the Vision API key. leaves the document. What did you tell, Patrick? Forget document AI. Your apps been using Cloud Vision the whole time. Okay, that makes sense. And it's already working in production. So just go into the top. Okay, so the only thing I want to let it know is when you go back to your other project real quick, which is the inventory control one, and I just want to see if it has credentials. So it is an MC OCR gateway key active. Interesting. So let me just ask, does it matter? So project he's in, and gives me the API key he's from, because he has a first project project, inventory control OCR project, the vision API key is in his my first project, yet the RMCE OCR gateway key active, yet it has another API key, and RMCE OCR, RMCE RMCE OCR, R, E, Obey, control.

**Patrick McCreary** (00:19:25)
Oh, okay.

**Avry Stroeve** (00:19:40)
Perfect. So... Okay, so, okay, let's go to, I just want to check to see which project we should continue working in, and I want to validate which one. So go to the hamburger menu in the top left, go to billing, which is right there, starred under favorite products. Okay, so your total cost me first to the 20th is 21 cents. So go back over to the other, the waffle icon. This one? No, the one right below it, were, yeah, that one. Is it letting you click it? Okay. And then go back to the, like Google, click Google Cloud, because we just want to get back to the homepage. Click, click that. Click. Click that. Thank you. Okay, and then click on the project in the top left where it says inventory control OCR. Click on that and change it to my first project and then do the same thing where we go to the waffle icon and then click billing and then also 21.

**Patrick McCreary** (00:21:21)
I don't know if it's a global billing account, but I want to see.

**Avry Stroeve** (00:21:25)
Okay, I don't think it's not going to matter. I think we're going to just like start keep working in the my first project one. So let's go one last time. I know you've been doing a lot of clicking, but one last time. Click the Google Cloud or click, yeah, click the Google Cloud. Let's make sure we're on my first project. Okay, cool. Now go to APIs and services, which is like in the hamburger waffle icon. Again, top. Left, APIs and Services, Enabled APIs and Services, and then it is enabled. Okay, cool. So now we just go to Library, like Library, and let's, okay, cool. So that's the library of all of them, and then go back really quickly, and then go to Credentials. That's the next thing. All right, so the API key, and then what you'll do is create a credential in the top middle. And then API key, and then name it Avery-Dev, sorry, Avery-Dev, and then click where it says no API selected, then add that. Add the vision API, so we're looking for vision. If you search and type vision, I think it'll work. Type to filter, vision, yep, cloud vision API. Boom. Okay. And then authenticate API calls through a service account. API calls may be made with this key, will be authenticating bound service account, the option required. Let me, I'm just, before we 100% confirm that, I'm going to select this. And then save this. Okay. And actually, so really quickly, can you open a new tab and go to Vercel? In Vercel, oh, and then we were dealing with this the last time. And I think from your device to authenticate it to your Vercel account, could not verify user code, review the spelling or issue a new code from your device.

**Patrick McCreary** (00:24:46)
What did we do last time? Because we ended up just going to Vercel a different way and it worked. Do remember that?

**Avry Stroeve** (00:24:51)
It was because you, it was because OpenAI, ChatGPT, got you into Vercel.

**Patrick McCreary** (00:25:01)
There we go. I'm in. Wait, what?

**Avry Stroeve** (00:25:06)
I don't think that's accurate, though. I think because this is a team, we're looking for your projects. So if you go back, what? Okay, I guess it worked. That's crazy. I don't know why, but okay. So go to your all projects in the top left. All, like, all projects top, or click on the drop-down menu, sorry, next to all projects. Like, top, top, one more, like, to the right, to the right. From there, all projects.

**Patrick McCreary** (00:25:43)
Oh, . I saw it. Oh, what the hell? Click. It's all good.

**Avry Stroeve** (00:25:48)
Go, go, yeah, click that, and then click the back arrow, and then all projects, and then RMC inventory control. And then we're going to go to settings in the left-hand side panel bar. You go to settings, like left-hand all the way at the bottom, get there. And then environmental variables, environments, right there in the left-hand side. Again, left-hand environments. Okay, and then, okay, well, it's actually, go to, let me just double check, environment variables, project settings, environment variables, environment variables is open. So, Build and Deployment Settings. So, Build and Deployment on the left-hand side. And then, let me just look at this. Framework Settings, Root. directory, ignored build. Scroll down a little bit. Next.js version. Scroll down. Keep going down a little bit more. Build machine. Is that the end of this?

**Patrick McCreary** (00:28:17)
That's it.

**Avry Stroeve** (00:28:18)
Where? Okay. Go to click get and then get commits, pull request. I'm looking for the environmental variables. Can you scroll down on this? All right.

**Patrick McCreary** (00:28:42)
General.

**Avry Stroeve** (00:28:43)
Well, maybe general. I would be sad if it was the first one. So on the left-hand side, project name, project ID, virtual toolbar, data preferences, transfer, delete project, security. Try security, because it would be in, it might be in security, because they are variables. Okay, secure backend, get forked, deployment retention policy. Where is it? Okay, I'm going to just ask you.

**Patrick McCreary** (00:29:17)
Can you? Oh, yeah, yeah, environment variables.

**Avry Stroeve** (00:29:20)
Well, there's environments, but. I know, but it didn't, there it is, environment, it's right there. Okay.

**Patrick McCreary** (00:29:29)
Where is it? I don't know. Okay, cool.

**Avry Stroeve** (00:29:32)
So, all right, so you have an OCR worker gateway key, have an OCR worker API key, OCR worker URL, accounting, alert, super base storage, super base URL. Cool, so can you click command and then the minus button a few times to, like, zoom out on this? Okay, and one more.

**Patrick McCreary** (00:29:58)
Yeah, zoom in a little bit.

**Avry Stroeve** (00:30:01)
Great.

**Patrick McCreary** (00:30:02)
It's fine. Is that good? Uh, one more.

**Avry Stroeve** (00:30:12)
So I see how you should face. Can you scroll down? Resend. So you do have resend. Um, let me just, okay, what I'm gonna do is, can you actually zoom in one more time and scroll all the way up to the top? Zoom in once, maybe twice. Or zoom in.

**Patrick McCreary** (00:30:40)
Yeah, zoom in once, maybe twice. Zoom Okay, cool.

**Avry Stroeve** (00:30:45)
And then just stay right there real quick. And then now can you scroll all the way down?

**Patrick McCreary** (00:30:58)
What are you doing, screenshot? Can and ask in ChatGPT what's next? No, I know.

**Avry Stroeve** (00:31:04)
So I'm taking the screenshots to make sure we can cross-reference all of the ENV variables that you have. And then I didn't add. Let me just double check. I have the screenshot. And then the one that we need to cross-reference real quick is going to be the Vision API key. But I just want to make sure I get these into my chat real quick so that we can actually... Okay, there we go. These are all the stuff. And then we are looking for the Vision API key. So inventory next, resend inventory. Google Cloud Vision API key. There it is, right 10 up from the top. Well, sorry. The bottom I'm at. Right there. Oh, you just get right. Three more up there. All right. And then click the three dots on the hand side and then edit. Okay. So it's blank. What the heck? Okay. So what are you using to actually run this? I'm so confused. Okay. OpenAI API key. Because there's no value there. Usually there would be a value. And that's what it's using to actually call the Google Cloud Vision service. But maybe there's another Google Cloud Vision. So let me keep looking through these real quick. OCR worker, OCR worker gateway. Can you scroll up a little bit on the list? I don't know if because you're editing, it might not let you scroll up.

**Patrick McCreary** (00:32:58)
I feel like the OCR. OCR worker is what it is. It's the OCR worker. Okay.

**Avry Stroeve** (00:33:04)
One of these two.

**Patrick McCreary** (00:33:06)
Okay.

**Avry Stroeve** (00:33:06)
Yeah, then edit that. Okay. And then click on edit.

**Patrick McCreary** (00:33:13)
No. OCR worker.

**Avry Stroeve** (00:33:16)
Because you have a – wait, check on the – check on – like, I just want to see if it's actually hiding it or if it's not there. So can you, like, click on any – can you click on all – like, which one do we know for sure there should be one? Click on the Supabase – any of the Supabase ones. Let's just see. Okay. So that one doesn't have it. And then click on the OpenAI API key, right, which is one right down from the top. And the reason why we're doing this, by the way, just so you know and understand, is – Okay. I want to see which project you're in, and the Vision API key is enabled. I think because this isn't a huge crazy, we have to be super sensitive about making sure that we're both using different keys to see where the key is getting paid from, essentially, or where the key is costing money. Then just go back to your Google Cloud Console, and go into the project that we were just in, and don't create a new one. Create, click on the, oh, but you didn't save it. Did you save the API key, do you think, or no? Maybe, I think so.

**Patrick McCreary** (00:34:51)
You did? Yeah. Okay.

**Avry Stroeve** (00:34:55)
Oh, then, okay, then let's check your, you probably didn't save it. It in your password manager, but it is definitely in your environmental variables. So can you open up on your computer, can you go to your finder, and go into, so where, we need to try and find where you're storing the project, which might be in documents or developer. So, are you storing it there?

**Patrick McCreary** (00:35:35)
New project?

**Avry Stroeve** (00:35:39)
Do you have a chat open anywhere with it?

**Patrick McCreary** (00:35:47)
Yeah.

**Avry Stroeve** (00:35:49)
Can you just ask, hey, for the RMC inventory control, yeah, whole inventory app from repo, where, ask for the... File Path, say what is the File Path path for, actually you can just say, open this project for me in Finder, so I can see where it is. Open this project's directory for me in Finder, this project's directory for me in Finder, so I can see where it is. So I can see where it is. Okay, cool. So you have RMC Inventory Control and RMC Inventory Control 2. Can you ask it, which RMC Inventory Control 2, which RMC Inventory Control project is the main branch on right now, project? The main GitHub branch on right now is the main GitHub branch on right now because GitHub branch on right now because we, oh wait, you click escape and just let it know or whatever, it'll, it'll check. I'll check the local Armsy inventory folders and their current branches.

**Patrick McCreary** (00:37:23)
Okay. Did you click escape? I did. Okay, cool.

**Avry Stroeve** (00:37:28)
Yeah. Just say because I see two, I see because I see two different ones in the, in the one that in the GitHub directory that you just opened, um, directory that you just opened. Okay, can you go back to the chat real quick? And then use this one, rmc, github, rmc, inventory, control, that folder is on main, it matches the github. Okay, cool. So let's go, like, go click command tab real quick. Yep, no, you're good. You can click off of it. I think you're holding, yep. Or click command tab again.

**Patrick McCreary** (00:38:56)
There you go.

**Avry Stroeve** (00:38:57)
Okay, so then go in. And then tell it, I need you to open the .env variables file so I can see what's in it. .env variables file, so I can see, or yeah, it'll know. File, I can see any secret values in the chat, is in users, documents, github, rmc control too. Okay, cool. So, all right, perfect. So it just opened your .env variables folder. So let's just look through this real quick. So you do have an open AI key. You do have an OCR worker. Your API key, you have a Google document processor name, and you have all of the Supabase keys. So normally, just so you know, what we would do as a professional developer team is each of those different variables and keys, you would create me one of my own so that we could track where the costs of the API key are coming from. But since we're basically just trying to fix this one little thing, I'm just going to use the ones you've already generated in mine. So what I need you to do is honestly just like command A that and send it to me. Normally, you would not want to send all of these over chat. And when I deliver this to you, what we will actually do is we're going to go rotate all of these with new fresh ones so that they're... So so that they're actually secure. But yeah, just command V that, C, command V, and okay, cool. So that's that. That will actually basically take care of all the other questions that we have about how it's working. Can you just ask your codex and say, hey, are there any other .env files being used for this project? .env files and also variables being used for this project, and or also variables being used for this project, and or variables being used for this project. I'll inventory this without showing secret value. Good. Yes, I checked without printing secret values. Okay, so can you scroll up? So, envvarial, real, okay. So, real local envv file, env local, safe placeholder in the main branch folder is the example env, other placeholder copies. You can just give it some content. can be like, so, and honestly, you can just talk to it. Maybe it'll be able to hear me. Can you click the volume, the, like, microphone button real quick? Sure. Hey, can you hear Avery real quick? Can you hear me? Can you hear me? Is it picking up? Yeah. Okay, cool. So, Codex, can you just confirm? Hold on, let me delete it.

**Patrick McCreary** (00:43:11)
Okay. Okay, go ahead. Cool, thank you.

**Avry Stroeve** (00:43:15)
Codex, can you please confirm? So, we just opened that .env file in RMC Inventory Control 2, the env local, and I am working with a developer, and he's going to use those, and then we're going to rotate them once he's done. But I need to make sure and confirm that I don't need to send him any others over, and I already know that it's not best practice to send over those exact keys and that we should be using different ones, but for the sake of this specific project, it's fine. And, um... I basically just need to know, are there any other values that I need to send them, or is the file that we just opened with all of the keys the only ones that he needs? Or does he need any others that were not included in that file? That's so much more efficient. Oh, my gosh.

**Patrick McCreary** (00:44:28)
That's awesome.

**Avry Stroeve** (00:44:32)
Yeah. It's make me yawn, . Bedtime, man.

**Patrick McCreary** (00:44:43)
I've been up since 1.30 in the morning.

**Avry Stroeve** (00:44:47)
Doing what at 1.30? Couldn't sleep.

**Patrick McCreary** (00:44:52)
Out of excitement or insomnia or?

**Avry Stroeve** (00:44:57)
Distress from work.

**Patrick McCreary** (00:44:59)
Hmm.

**Avry Stroeve** (00:45:02)
What is, like, the most stressful thing?

**Patrick McCreary** (00:45:07)
Oh,  drama at work, and trauma at work is thick. But I think I've identified it and getting rid of a lady. Okay.

**Avry Stroeve** (00:45:22)
So short answer, it's not the production site, it's the most, but it's missing four values that are currently in Vercel and are used by the app, inventory email from, inventory email, Google Cloud Vision API key. What that means, without resend API key to inventory email from staff. Okay, so for the full parity, send him the ENV plus those four Vercel values. Everything else in the code is either already in that file. Ask it, can you see those, here, let me talk to it real quick. Okay, hold on. Hey, Codex. So can you see those four values in Vercel? Do you have access to my Vercel account? And if you can't see them, then I want you to give me the step-by-step instructions of how to go get each of them. And you cannot leave anything out. You have to give me, like, literally talk to me as if I'm a complete beginner and give me the exact step-by-step. What computer are you running, by the way? Mac Studio.

**Patrick McCreary** (00:46:54)
Okay,  yeah. M1, like, 32 gig. Nice.

**Avry Stroeve** (00:47:00)
I can confirm the variable names in Vercel, but Vercel shows their values as encrypted. Checking whether Vercel safely pull these values into a file because they may be easier. Vercel, CLI says, Nubipole can pull a selected environment to a file. I'm going to test that in a temporary, see what variable names present. Vercel, CLI says, Nubipole can pull a selected environment to a file. I'm going to test that. I just re-read what I was reading. It's to update the Vercel, CLI can pull production values and just update it to locally in VNRMC and production variables. Checking the variable names only now, I'll tell you exactly what changed and what to hand to the developer. The refresh now has four missing production values too. It also pulled some Vercel generated turbo variables that your developer does not need. I've been checking that side effect before I recommend sending the file as it is. Okay. Then you click on the chat right below.

**Patrick McCreary** (00:48:59)
Yes.

**Avry Stroeve** (00:49:00)
Pull the production variables out, includes the four missing values, so no, there's no normal project values it needs beyond that. One important thing is to pull also add some extra, I created, okay, so tell it to open that developer, open that, open that developer env file, okay, so it didn't even, it, rotate these, it didn't even add any of the keys, so you, So click the X button on that real quick, and then that other one's still fine. Wait, don't exit out of that. We might still need it. So tell it we don't see any keys in the developer local. And yeah, here I can actually do it. We don't see any keys in the developer local file. And I want you to tell me how to navigate. I want to navigate to these myself. No, actually stop. Stop that real quick. Um, I don't see anything, just want you to tell me, I want to navigate these myself on my Vercel account on Chrome. Vercel account on, yeah.

**Patrick McCreary** (00:52:03)
Okay, it's done there.

**Avry Stroeve** (00:52:10)
So scroll up real quick. to find them in Chrome. Okay. So again, and we already kind of went through this process, but they weren't there. So what I'm going to, because it, so can you scroll up? I just want to remember what were the four variables that it said we don't have. It said, resend inventory email inventory Google Cloud Vision API key. Can you ask it, I say, here, let me talk to it real quick. Okay. So the, the, so. So two things I want to verify. One, I want to verify that the env local file still has all of the proper keys that we had before you did the Vercel pull. And I want you to be 100% honest with me that if we don't have those values anymore and they got deleted, then you need to tell me. And if they are still there, well, actually, I need you to, so that I can verify myself, I need you to open the env.local file, not the env.development one, so that I can see what's there. And then my other important question or thing is, I need you to, so that's the first step in this checklist item. The second checklist, once I've actually validated that the env file is actually good, I want to revert it back to how it was before, but I won't do that until... So check it first. And then the second step is revert it back to just ENV local and then delete the developer one. And then the third thing in the checklist item that we want to get done, step by step though, the third thing is we have four missing values, the recent API key, the inventory email, the inventory email receipts, and then from, and then the Google Cloud Vision API key. I want you to confirm where the Google Cloud Vision API key is actually being used. And if the resend API key is actually being used within the main branch code currently.

**Patrick McCreary** (00:54:42)
The chat GPT whisper.

**Avry Stroeve** (00:54:47)
Wow.

**Patrick McCreary** (00:55:07)
Most versions are now there too, but one previous key is no longer.

**Avry Stroeve** (00:55:20)
So do not let me revert anything yet until you've looked. So click, can you tell it to open the file? Okay, so that's there. And then, okay, so that's fine. And then, so can, can you tell it?

**Patrick McCreary** (00:55:52)
Perfect, perfect.

**Avry Stroeve** (00:55:54)
Can you click that? Okay. So you said the Google Document AI processor Do you have that in your memory still so that you can keep the for that got added and also add that Google document AI processor surname back in with its exact API key or key? Or you have to be 100% honest if you are not able to actually get that back. And then once we get that back, we can delete the developer local file because we don't need that. We just need the env local file and make sure that the env local file has all of the proper things. And then once we have that, then we can move on to actually checking the code and seeing which ones of these are actually being used. It's okay. I think we, oh, we have it. Oh, thank God. Okay. You can just say, you can, oh, wait, it found it.

**Patrick McCreary** (00:57:18)
Okay.

**Avry Stroeve** (00:57:20)
Codex session logged from before the Versailles poll. It's a Google document processor name. I'm going to restore it. Keep the four. Okay. Cool. Okay. And then now can you go to the ENV while it's doing that? And can you click Command A on that and then send those all through? Does that have the resend API key? Wait, can you just, does it have, I don't see resend on there. Can you tell it to open the file with resend API key? Okay, wait, let me look through this. One honest verification, non-API, code usage. Okay. I need, and then tell it, I need you to open, or so, yeah, tell it, well, here are two things. Let me, let me, let me talk to her real quick. One more. All right. I need you to open the env.local file that has the resend API keys, because I don't see them on the env.local file that you just opened. And then number two is, if these... If four AI keys, API keys, weren't in the ENV local file, are they hard-coded in the code, or how were they actually being used? Or how were they actually being used if they're not in the ENV variables? Oh, never mind. They're in the Vercel. But if we didn't have them on our computer, then they just wouldn't work in a development environment? Is that the case? It's exactly... I opened... Okay. Verified by name. Are in the file and have the values, and yes, they are not hard-coded. code reads them for me. You're not on your computer, local development. Okay, so can you go into the file that it just showed, and I just want to see the file that it just pulled up, right up, I don't know, like, command-t, or command-tab real quick, two over, command-tab-tab, command-tab-tab-tab to finder, and then actually do the little, you can do the little one-above-tab to go back, or you can just keep going forward.

**Patrick McCreary** (01:00:34)
Oh, really? Yeah, the one-above-tab, yeah, there we go.

**Avry Stroeve** (01:00:39)
And then, oh, wait, sorry, it's the text editor, so click command-tab to the text editor, one, two over, here we go. Okay, and then, do you see resend anywhere? I can't. Can you scroll up a little bit? I do not see. I don't see it. Can you go back to Codex real quick? Or click on the X button on that text file, actually. I think what's happening is click on the X file on the AMV local text file and then tell it to open it one more time. Maybe it's because we had it open the whole time and then it... . It just deleted those. Okay. Um, so, what you can do, because luckily we copied and pasted all of it in chat, I don't know why it's doing that, but you can go back to your messages, and, or if you have it all copied, I think you might have it on your clipboard, but you can copy all of that, and, um, and actually add it back into the file.

**Patrick McCreary** (01:02:27)
Add it back into the file?

**Avry Stroeve** (01:02:28)
Yeah, because the file doesn't have any of the keys, I don't know why it's not, or they, so, wow, this is a lot of, like, crazy, tedious little stuff, wait, not, not to it, so. I shouldn't pull the keys here, should I? Well, no, but delete, delete it, I mean, it already knows, by the way, um, but. I need you to send a screenshot of the ENV local by clicking on the ENV local file, and then Shift-Command-4, and then take a screenshot real quick. And then, yeah, and you can just be like, drag and drop that into the chat, and just say, this is what it's showing me when you open those ENV local file. What can we do, actually? Know if this is, otherwise we're just going to Command-V them back in, and then go from there. While that's thinking, can you go to Resend, or can you open up a new tab in your Chrome, and can you search Resend, R-E-S-E-N-D, email, Resend email, yep, and then you send an email for developers, and then can you log in in the top right, and then log in with, or it looks like you might have logged in. Yeah, can log in with GitHub if you think that that, select Thrize. Okay. And then go to API keys in the left-hand side. Okay. RMC inventory production. Okay. Cool. So can you click on the token right there? And can you copy that token? It may or may not let you. Okay. It definitely doesn't. So create an API key. Name it Avery-Dev. Oh, it just opened the file and you started typing the file. Avery-Dev. Okay.

**Patrick McCreary** (01:05:43)
And then add.

**Avry Stroeve** (01:05:48)
And then copy that and then add it to your keychain. First. No, wait, don't click done. Oh.

**Patrick McCreary** (01:05:57)
okay. It's okay.

**Avry Stroeve** (01:05:58)
You copied it. You copied. So you're good. Just go to your keychain. My keychain? Where's that?

**Patrick McCreary** (01:06:04)
Your Apple keychain, like your password manager.

**Avry Stroeve** (01:06:07)
Oh, okay. And then add that plus button in the top right and say resend API key, Avry, resend API key, Avry, and then 52026, 52026. And then go down to the password area and then change that, like delete that and command B, save that, and then text that to me, save anyway, and then just text me that same key. Um, and just say resend and then command V, or you can do that. Yeah, that's fine. Resend. Cool. And then, um, while, because we just did that, go back to ChatGPT. And by the way, we'll be done with this, because I know we've been going for a while. We'll be done with this in approximately like 10 minutes, and then we'll be good. Um, can you go over to, uh, OpenAI Codex again?

**Patrick McCreary** (01:07:29)
Like click the back.

**Avry Stroeve** (01:07:31)
Okay, so, and yes, you're understanding they used, they're not hard-coded. Okay, so can you scroll up a little bit? So, and then down a little bit. You were right, the screenshot showed blank values. My earlier check was wrong because it treated key as present. That was my mistake. I restored the old local values that I could recover from the previous session. Uh, okay, and then click command tab over to the text editor, which is four over. And let's see, document, envlocals could not, I'll just say the file has been changed, just click on save anyway, okay, click on the X button in the top, and actually say, say try, try whatever you just did again, because I was still in the text editor, you just did again, to restore, to restore. Because I was just in the text editor. And then, yeah, so inventory email, inventory email recipients. Got it. I'll run the restore on disk. Okay, cool. So I think, okay, perfect. Ah, thank. That feels so good to have that. Okay, cool. So now your recent API key, inventory email, inventory email recipients, and Google Cloud Vision API key are all still blank. So let's go to Vercel real quick, which is in your Google Chrome. One more over. Two more over now. To the right.

**Patrick McCreary** (01:09:44)
Okay.

**Avry Stroeve** (01:09:45)
And then, uh, yeah. Vercel domains. Okay, and then, so you actually need to click the back arrow on the top left, or no, it says back, like the back button, that one. This one, that I'm on? Yeah, and then click all projects, that drop down, RMC, and then search or find environmental variables, okay, and then click on it in the left hand side panel, there's like an environment variables button. Yep, okay, and then can you expand your screen a little bit so I can see? Okay. And then we're going to look for, specifically, we are looking for the resend API key. So if you can find that, I think it's down at the bottom, and then click on the three dots, and then view history. Let's see if view history is actually better. add it, never mind, that's not going to show us any valuable information. Resend API, click edit. Okay, it's not there. So I don't think you actually, what I'm thinking is, you didn't actually set any of your environment variables. So that's going to be something that we do, when I'm going to basically take the resend code, and then the other thing that I need, which you gave me, let me just double check, you gave me all the ones that I would need to run this. So you gave me OpenAI, and then we have all of these, which are the OpenAI key, the Supabase, the OCR worker, there's one that is the, so you gave me Open, and then let's go to one last thing. Let's go back to the Google project, the Google Cloud Console project, which is in the top right, and then, cool, and then go to console, in the top, top right, top right?

**Patrick McCreary** (01:12:44)
It's on the wrong account. Oh, okay. Yeah.

**Avry Stroeve** (01:12:47)
Edit it. Console. Okay. Cool. And then select a project, and change out of my first project, and go to Inventory Control OCR, and then go to. So in the top search bar, when you search for products and services, type in Google Vision, or Vision API, Vision, Google Cloud Vision, that one, that one, and then click Enable. And then also click on, so in the top search bar, click on our search document API. So document, okay, document AI is good. It started with document.ai, document.ai, me just verify that it's the document, the school cloud project, OCR, document.ai, yep, cool. And then you can click explore processors. This one we may or may not need. Okay, cloud document.ai, API. You can enable that one too. Cloud document, AI APIs, we have the vision, we have the cloud document, API should be adding, and then once it's added, we're going to go back to the AI, okay, cool. And then now go back to the waffle in the top left, the waffle icon, APIs and services, enabled APIs and services. So go back, and then go to library, or sorry, not library, credentials, credentials, cool. And then click, so the first thing is click manage service accounts.

**Patrick McCreary** (01:15:49)
Where is that?

**Avry Stroeve** (01:15:50)
Or it's in the right-hand side where it says manage service accounts. Okay. And then, let me just take a screenshot of that, so that we have those in. What the heck, where is it going? Let me just make sure.

**Patrick McCreary** (01:16:50)
I'll be right back. Yeah. All right, what's next, man? I want to go to bed. I'm tired. Okay.

**Avry Stroeve** (01:17:36)
So then the last step besides these would be to, one, is create a service account in the top left, and then just say Avery-Dev. And then create and continue, and then select a role, which is going to be Cloud, API, Gateway, Access, Approval, Access, Contact, Job Function, Currently Used. Yeah, click that, Cloud, API, Gateway, Service Agent, Account, Access to Service Management, Check-in Reports, as well as Impersonation on Neither Specified Service Accounts. And then click Add Another Role.

**Patrick McCreary** (01:18:40)
Don't hit Done, just click Out? No, sorry, click Add Another Role.

**Avry Stroeve** (01:18:44)
Oh. Okay. And then select it, and then Cloud, API, Management, Service Agent. This one?

**Patrick McCreary** (01:18:54)
Yeah. Okay. Okay. Okay.

**Avry Stroeve** (01:18:57)
And then you can click Done from there. And Okay, cool. And then I'm just going to take a screenshot of that, and then you can go back to the service, like the API area where we were. So you can just basically click the waffle icon and go back down to API and services, and then go to credentials, and then go to API keys, and click on create a credential, and then API key, and then just name it Avery-Dev, and this is the last one, Avery-Dev. And then the selected APIs are going to be, they're going to be the two that we added, so select APIs. In the drop-down menu, top, or like right there, no IPIs selected, click that, click search vision, yep, and then also search document, vision and document, document, cool, click that one, okay, okay, and then click authenticate API calls through a service account, API calls made by this key, I actually wouldn't do that, so you don't need to, but you do need to reselect the API since you clicked out, cloud document is good, and then vision, you and your V's man, VVV. Okay, and then click create in the bottom.

**Patrick McCreary** (01:21:10)
It's like crazy outside. Really? I can't hear it.

**Avry Stroeve** (01:21:15)
Click that, copy that. Same practice, copy it, go into your Google Cloud Keychain, or sorry, your Apple Cloud Keychain, so you can exit full screen. Go in there. And then add Google API Key Avery, Avery, and then 10, or sorry, 520, my bad, 520, 26, and then where the password says, delete that. Command-V, save, save anyway, text, text to me, Command-V, Google, okay, and then we're good. All right, bedtime. Okay, good night, brother. Have a beautiful night. I'll talk to you soon.

**Patrick McCreary** (01:22:28)
See you, Thank you. I'll see next morning. Bye-bye.
