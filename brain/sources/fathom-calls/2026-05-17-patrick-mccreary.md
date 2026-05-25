---
title: "Patrick McCreary - Troubleshoot the failing inventory app and set up..."
meeting_title: "Impromptu Google Meet Meeting"
date: 2026-05-17
duration: 44
recorded_by: "Avry Stroeve"
fathom_account: avrystro@gmail.com
domains_type: one_or_more_external
transcript_language: en
participants:
  - name: "Avry Stroeve"
    email: avrystro@gmail.com
    role: internal
fathom_id: 147066343
fathom_url: https://fathom.video/calls/676718271
share_url: https://fathom.video/share/7sBZ5vPy99bxmVib_sZpUzLKQhjyHfyG
tags: [ai-tools, app-development, community, security]
status: enriched
projects: []
captured_to: []
captured_date:
unknown_speakers: [Patrick McCreary]
---

## Summary

## Meeting Purpose

[Troubleshoot the failing inventory app and set up development access.](https://fathom.video/calls/676718271?tab=summary&timestamp=4.0)

## Key Takeaways

  - [**Problem:** The app fails in production, preventing staff from uploading invoices and blocking month-end inventory.](https://fathom.video/calls/676718271?tab=summary&timestamp=4.0)
  - [**Goal:** Fix the app by Friday, May 21, for month-end inventory, ensuring it can process \~100 invoices/month and track data for 11 months.](https://fathom.video/calls/676718271?tab=summary&timestamp=2117.0)
  - [**Blocker:** Setup is stalled by Google Cloud key configuration, which is more complex than anticipated.](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)
  - [**Path Forward:** Avry will test the OCR workflow in a local dev environment, then provide Patrick with a clear, step-by-step guide for production setup.](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)

## Topics

### Problem: App Failure & Business Impact

  - [The app fails in production, preventing staff from uploading invoices.](https://fathom.video/calls/676718271?tab=summary&timestamp=4.0)
  - [**Impact:** Blocks month-end inventory calculations, which are critical for the business.](https://fathom.video/calls/676718271?tab=summary&timestamp=2117.0)
  - [**Required Functionality:**](https://fathom.video/calls/676718271?tab=summary&timestamp=4.0)
      - [**Invoice Processing:** Capture invoice images and extract data.](https://fathom.video/calls/676718271?tab=summary&timestamp=24.0)
      - [**Inventory Tracking:**](https://fathom.video/calls/676718271?tab=summary&timestamp=61.0)
          - [Voice input for manual inventory counts.](https://fathom.video/calls/676718271?tab=summary&timestamp=61.0)
          - [Calculate on-site inventory: `(Prior Month Close + Purchases) - Ending Inventory`.](https://fathom.video/calls/676718271?tab=summary&timestamp=79.0)
          - [Apply the most recent purchase price for accurate valuation.](https://fathom.video/calls/676718271?tab=summary&timestamp=115.0)
      - [**Data Scale:** Support \~100 invoices/month and track data for 11 months.](https://fathom.video/calls/676718271?tab=summary&timestamp=134.0)

### Blocker: Key & Security Setup

  - [**Supabase Keys:** Patrick provided the necessary keys (Project URL, Anon Public Key, Service Role Key) via iMessage.](https://fathom.video/calls/676718271?tab=summary&timestamp=747.0)
  - [**Row Level Security (RLS):**](https://fathom.video/calls/676718271?tab=summary&timestamp=910.0)
      - [**Users:** Staff (front-end), Admins (Patrick, Corey, Dana; back-end).](https://fathom.video/calls/676718271?tab=summary&timestamp=1021.0)
      - [**Status:** RLS is currently off. It will be enabled for production to secure data, but is not a blocker for local development.](https://fathom.video/calls/676718271?tab=summary&timestamp=1274.0)
  - [**OpenAI Key:** Patrick created a temporary `Avery Dev` key with full permissions for development.](https://fathom.video/calls/676718271?tab=summary&timestamp=1400.0)
  - [**Google Cloud Key:** This is the primary blocker.](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)
      - [**Issue:** The `Vercel OCR Invoker` service account lacked the required `Document AI API User` role.](https://fathom.video/calls/676718271?tab=summary&timestamp=2249.0)
      - [**Action:** Patrick added the role, but the process for generating the correct JSON key remains unclear.](https://fathom.video/calls/676718271?tab=summary&timestamp=2249.0)

## Next Steps

  - [**Avry:**](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)
      - [Test the OCR workflow in a local dev environment using personal keys.](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)
      - [Create a clear, step-by-step guide for Patrick to configure the production Google Cloud keys.](https://fathom.video/calls/676718271?tab=summary&timestamp=2419.0)
      - [Schedule a follow-up call for Monday or Tuesday to complete the production setup.](https://fathom.video/calls/676718271?tab=summary&timestamp=2602.0)
  - [**Patrick:**](https://fathom.video/calls/676718271?tab=summary&timestamp=1584.0)
      - [Delete the temporary `Avery Dev` OpenAI key after development is complete.](https://fathom.video/calls/676718271?tab=summary&timestamp=1584.0)


## Action Items

*No action items*

## Transcript

**Avry Stroeve** (00:00:00)
Explain some stuff around it.

**Patrick McCreary** (00:00:04)
Well, this is the big thing I need from you is to figure out how to make it work because it keeps failing. Let me tell you the message I got from Kimmy. She said she keeps saying it's failing. So what she's trying to do is take pictures of the invoices from Shamrock. And when she does that, it, like, it'll let her take some in, but then I never saw it on my end, on the back end. Okay.

**Avry Stroeve** (00:00:42)
So, yeah, they just never ended up in Superbase, essentially. Yeah.

**Patrick McCreary** (00:00:46)
So if you have some receipts laying around your house or whatever, you should add it to the Superbase, right? Mm-hmm. Um, that's... That's... That's... That's... Probably step one. Step two is the voice, which I believe I got figured out. So the voice is you would go in and you would say like, chicken breast, 10 pounds, and then you would hit stop and it would add it to the inventory. Okay. And then third, what it's going to do is it's going to collect all of your, so basically it'll collect all of your purchases for the month from you uploading all the receipts, right? It's going to add the previous month's end of close. Okay. And so it's going to, yeah, so it'll add up your previous month's close. Plus your purchases minus your ending month's inventory to figure out how much inventory you have on site, and then it'll divide it. So all that work's been done on the back end. It's just getting it to. Basically, save those invoices, and then when you do add chicken breast, it needs to go in, find the most recent price, apply that price to get the inventory to come out correctly. Yep. And it needs to work for, like, a lot of documents, you know, so.

**Avry Stroeve** (00:02:19)
Yeah. Wait, a lot of documents or just a lot of receipts?

**Patrick McCreary** (00:02:22)
A lot of receipts, yeah, that's what I'm saying. So it's got to be able to hold, you know, 100 invoices per month. Yeah. And be able to go back, like, a full 11 months of the year. You know, I want it to be able to track, like, a whole year so we can look at how inventory is fluctuating. Mm-hmm. Yeah, so. Okay.

**Avry Stroeve** (00:02:46)
Cool. Yeah, I can definitely do that. Before we get off the call here, I'm just going to first show you how to, like, enable, I don't know, you probably already have, but enable. Road Level Security on every Supabase table so that you can kind of harden that in terms of security. And then I'll explain what I'm going to do on my computer to show you how everything's going to be super secure on my end. And we'll just get all the keys needed to be able to actually make sure that everything, like I can do the Supabase and make sure each workflow works.

**Patrick McCreary** (00:03:30)
All right, me check it out.

**Avry Stroeve** (00:03:36)
Okay, let me just setting it up. Here, let me actually share my screen.

**Patrick McCreary** (00:03:51)
You're probably going to have to reset the password on it too. Okay.

**Avry Stroeve** (00:04:12)
So I guess, do you have a Vercel Teams? What do you mean, Vercel Teams? Well, just the type of account.

**Patrick McCreary** (00:04:47)
I think I have a free one. Okay.

**Avry Stroeve** (00:04:52)
If not, I think we can easily have a workaround. You don't have to pay for it. Send this a save.

**Patrick McCreary** (00:05:24)
Thank you. Oh, okay. Here, I have a team URL. Is that what you want?

**Avry Stroeve** (00:06:14)
For Vercel, no. It's like the Vercel teams. The reason why I was asking that specific question is because in order to deploy from my computer to the GitHub as a PR, and then for you to then pull that PR into your main branch and then upload it to Vercel, Vercel, since I was the author of that most recent commit, Vercel basically doesn't allow you to do that. If you're, if you as the owner is, if it's me editing, then Vercel like basically just doesn't allow you to push it to production without paying them for the team subscription. But there's a workaround, which is just that you'll pull in the PR, and then you'll change the author, or you'll recommit as you being the author, and then we'll push it to production via your Vercel. So they gave me a team code, so maybe I am paying. Okay, well, yeah, here we can, I mean, well, basically to see if you have a team plan, let's just go into your Vercel, like here. Can you share your screen real quick on Google Meet?

**Patrick McCreary** (00:07:33)
Yeah.

**Avry Stroeve** (00:07:49)
Okay, so yeah, billing.

**Patrick McCreary** (00:07:52)
So I'm in general, and then see, this is all the team settings. Yeah, oh wait, he probably made.

**Avry Stroeve** (00:08:00)
Yeah, he probably had you do a team, but yeah, just go to billing, and then it'll show you. Okay, so you're not, you're on the hobby plan, which I'm pretty sure, and you don't have a payment, so yeah, you're paying for the hobby plan, which is not the pro plan, or the, wait, maybe you are, team settings? Can you go up to the top, middle, and click on team settings? Interesting. Because I just keep this team ID right here, so you can mess with it.

**Patrick McCreary** (00:08:30)
Okay, got it.

**Avry Stroeve** (00:08:37)
Let's try it. Okay, so basically in your project, by the way, you have a Supabase production key, you have a Supabase dev key, and then you have your Google Cloud document for, or document AI, you have your Google Cloud Vision, the OpenAI key, the Resend key, and And the OCR worker. So step-by-step, what we have to do is just one, we have to do the Supabase keys. So from your laptop, you can keep screen sharing, but go to supabase.com slash dashboard or just wherever your Supabase is. And then click on the RMC project. If this is the correct project, then is this. Do you have any other projects? just want to see if you might see. It's only project I have on Supabase. Okay, cool. Can you click the, on the top left, can you click the drop-down, like, little icon on Bonviant Project to the right of it? Okay, you have the org, and then go one more to the right where it says Bonviant Project, Bonvivant.

**Patrick McCreary** (00:09:56)
Okay, cool.

**Avry Stroeve** (00:09:58)
I just wanted to look at that. So then left sidebar and go to project settings, left sidebar, project settings at the bottom. And then you're going to click API, which is API keys in the left hand side, API keys. And yeah, I'm sure you know that API keys are basically just like a password to enter. So you'll see three values. You're going to see a project URL, which is at the top of your screen. Let's see. The project URL, you can just copy and paste the URL that you're currently at. This one? Yeah. And then send that to me, preferably over Telegram, unless you don't care. And then you can just do iMessage. Do you have Telegram? I don't.

**Patrick McCreary** (00:10:58)
Okay, no worries.

**Avry Stroeve** (00:10:59)
don't. Then. And iMessage is fine. And then we'll just, I mean, I don't think anybody's going to find iMessages, but we'll delete them anyway.

**Patrick McCreary** (00:11:09)
So send that project URL in via iMessage.

**Avry Stroeve** (00:11:13)
And then we're going to do the Anon public key, which is, so there's publish keys, secret keys, the Anon public key, and the service role key are the two things we need. So that's the public key. And then you have the service role secret. And then after we're done, after you send those over, we're going to also make sure that row level security is enabled. You need one too? Yeah, both the service role secret and then the Anon public key.

**Patrick McCreary** (00:11:47)
Oh, they're both exactly the same. That's funny. Oh, yeah, they're exactly the same. Okay. I don't know why they do that.

**Avry Stroeve** (00:11:57)
But yeah. Yeah. And then, let me just make sure your row level security is good. I'll show you this. So let me get those. Are you sending, can you send them over text? What are you talking about? You sent them over text? Yeah. I'm looking on my phone and I don't see.

**Patrick McCreary** (00:12:47)
Do you see IMC inventory control, Supabase, and then two blue blocks? Oh, yeah.

**Avry Stroeve** (00:12:53)
Not on my computer, but on my phone I do. Okay. Thank you.

**Patrick McCreary** (00:12:57)
Thank Thank you. you.

**Avry Stroeve** (00:13:02)
Okay, let me just get the Supabase URL. So, slash dashboard.com project. Okay, wow. Oh, wait, actually, for the project URL, sorry to interrupt you. Can you go back over to the Bon Vivant project and the top left and click on it? Like one more over to the right. Oh, now click into the project. And then can you copy that URL? Is it the same? I just want to make sure that's pretty sure.

**Patrick McCreary** (00:13:41)
a little bit different. Okay, then, yeah.

**Avry Stroeve** (00:13:45)
Oh, wait, there we go. It was right there. Bon Vivant project. You can copy that. HTTPS forward slash forward slash CBD. Like that. Yeah, that thing. Project URL. And then that's what I'll add, here, copy that, case url.

**Patrick McCreary** (00:14:27)
Hey Ben, come say hi to Avry. She says hi.

**Avry Stroeve** (00:14:37)
she here?

**Patrick McCreary** (00:14:40)
She heard it.

**Avry Stroeve** (00:14:41)
a visual key. They actually aren't the same, just so you know. At the end. Okay, cool. So that was Supabase. And then let's just make sure row level security is enabled too. Okay, so after Supabase, we're going to, so I'm just, is she here? Oh, she walked away. Can you go back into the settings real quick? Settings in the left-hand side, project settings, API keys in the left-hand top, and then... Okay, but the Anon key can read the table. It should probably need a fix, but it's safe for local dev. Okay, so it's off on all. Okay, Anon can read. Okay, so yeah, you want row-level security. So basically, that just means that it won't return a row to anybody who doesn't have the Anon key. Let's do this. So, by the way, are you going to have only, like, are you going to have you and staff and accountants with different views on this platform, or are you going to have it just be you? Like, who's going to be using it? Okay, so check this out.

**Patrick McCreary** (00:17:24)
the app itself, anybody with an at cateringbyrm.com website can log into it, can get it. Okay. And then the back end can be logged into by me, Corey, and Dana. Dana's my accountant, you know, Corey's the GM, you know.

**Avry Stroeve** (00:17:45)
He has a back end that him, his GM, and another person can log into, and then you'll have staff. Do you need to have staff, or?

**Patrick McCreary** (00:18:00)
Yeah, yeah. So this general staff will be like our chefs and our ops manager that are going to use the front end to upload the invoices and actually count the inventory off.

**Avry Stroeve** (00:18:13)
Upload the invoices slash receipts. And then he will have his backend view with his GM and a few other people. And do those other people need different levels of security of like what they can see and can't do? Or do you just want one admin panel where everybody can, like those three people can be? And then the front end view with like general staff. You don't want your own separate specific admin panel for just you and what you can see, right? You don't really mind about that or care about that for now? No, I don't care about that.

**Patrick McCreary** (00:18:49)
Okay, sounds good.

**Avry Stroeve** (00:18:52)
These notes are in it.

**Patrick McCreary** (00:18:54)
These already up in the repo.

**Avry Stroeve** (00:18:57)
Yes, but for the... The Supabase key, or like for the row level security that you're about to do, you just want to make sure it knows who to like give the proper access to. Ever talk to Supabase directly, or does every request go through Nickshed?

**Patrick McCreary** (00:19:17)
Just watch, what the hell? Everything feels like it works, but then the second I give it to my staff to use, it doesn't work.

**Avry Stroeve** (00:20:05)
Okay.

**Patrick McCreary** (00:20:07)
Yeah, so I don't understand. I tested it like crazy. I ran through all kinds of smoke tests and things like that. It does have Playwright enabled on it right now. Okay. So you can smoke test it and all that, but still being tricky in real life. And just to make any changes, make sure the tutorial updates it, you know what I mean, for the staff to use. Oh, okay. Yeah. Yeah.

**Avry Stroeve** (00:21:05)
Okay, cool. Yeah, actually, so we're fine there. For the row level security, it's more of a deployment or like a production thing than a development thing. So we'll just keep going to make this like kind of super efficient and then I can go work on it myself and then figure that out. Skipping the handoff. Okay, so. Okay, cool.

**Patrick McCreary** (00:22:39)
Okay, you got what you need?

**Avry Stroeve** (00:22:41)
So, if you, I just opened it and it works. I was able to, like, run the server and start working on it. Let's just say, I'm just going to get the vision. The Google API keys real quick, and then API keys go to RMC domain, verified sender address, alert recipient email list, dedicated project API with monthly cap. Okay, cool. Okay, so your OpenAI API key, you must be using that for some sort of generation instead of Anthropik or something.

**Patrick McCreary** (00:23:30)
You made that choice, right?

**Avry Stroeve** (00:23:32)
Yeah. Okay. Okay, so on OpenAI, you'll just make another, so go to OpenAI API keys, just search that. And then I actually can't see your tab of what you're searching. You might be searching in a different thing, but if you can share. Hold on, I can figure that out. You see it? And then go to API keys in the bottom left. And then create a new API key in the top right. New secret key?

**Patrick McCreary** (00:24:41)
Create a new secret key.

**Avry Stroeve** (00:24:43)
Those are like the same thing. And then just name it Avery Dev or something. Avery Dev. And then wait, wait, wait. Oops. Okay, I mean, it's good. You can just copy that and then... yeah okay yep text it you'd be real careful with that one man yes that so open AI and then Google so that for Google um go to Google Cloud and actually wait wait wait um can you go back to the other open AI one because I just want to make sure so okay so where is it right here Avery okay there's not a okay so actually yeah just to be just to be 100% certain can you click the edit icon on that um on the top right of line Avery Dev the like edit icon next to the trash icon And then can you go to the different permissions? just want to see. Okay. So the different permissions that I can have are all of those. Okay. Yeah. The all is what we'll do. I wanted to see if it could have an expiration date, but apparently they don't have that feature, which is weird. So you'll just, once we're done working on it, just make sure you come into your area here and delete it. I'll send you a reminder once it's up.

**Patrick McCreary** (00:26:33)
Cool.

**Avry Stroeve** (00:26:34)
And then to go to Google Cloud, Google Cloud Console, and then did you send that other API key? Oh, yeah. Never mind. I just got it.

**Patrick McCreary** (00:26:54)
Okay. Cool.

**Avry Stroeve** (00:26:55)
And then what you'll do is in the top where it says my first process. Project in the top left, and then click on it. My first, or inventory, yep, that one. Cool. And then, in the, let's see if it's there. Nope, I'm not seeing it there. So then go into the top left hand side with the waffle icon, and then scroll down. Yeah, click that. And then scroll down to API Services, Enabled APIs, or Credentials, actually. So go to the top, or top left.

**Patrick McCreary** (00:27:43)
Hi. He can see you. Oh. Hi. How are you? Good. How are you doing?

**Avry Stroeve** (00:27:54)
I'm doing good. Yeah. Yeah, was just, I was just telling Patrick that I'm I'm like an hour and a half away or like four hours away from where I'm normally staying because the police like got the license plates of the bike I bought. And so I'm having to go sort that out in a different way.

**Patrick McCreary** (00:28:14)
Why you're not allowed to drive or what?

**Avry Stroeve** (00:28:17)
Well, the bike, it was my friend's bike and he hasn't renewed his license plates for like three years in a row and he's never gotten pulled out. So, but then they did a whole like raid on the town. Like they did a whole operation and they took, they impounded 31 people's bikes, three ATVs and like a bunch of people like never renew. So, but luckily they didn't impound my bike because I made friends with them. So they just said, just drive home.

**Patrick McCreary** (00:28:43)
Good job. All right. Well, good to see you. Are you planning on coming to Colorado at all this summer?

**Avry Stroeve** (00:28:51)
Um, I'm like building a lot of momentum here with the, like where I'm, cause I want to live here long-term and I've been meeting a lot of the community. If I do, it would probably be later. I know Max's graduation is happening, but I don't know if I'm going to be able to make it back for that. But if I do, it'll be like later, near like July, August time.

**Patrick McCreary** (00:29:17)
And then grandma and grandpa also want me to go see them too.

**Avry Stroeve** (00:29:20)
So I might need to make a whole loop for a month or something.

**Patrick McCreary** (00:29:25)
Did you say Ida Lulu? Ida Lulu. Okay, bye, Avry. Love you. Bye. Okay, so. Good, Patrick.

**Avry Stroeve** (00:29:35)
Yeah, Patrick. So left-hand waffle thing, APIs and services, and then credentials.

**Patrick McCreary** (00:29:43)
Oh, . No, you're good. You're good. Credentials? Credentials. Yep.

**Avry Stroeve** (00:29:50)
Then, so API keys. So configure consent screen. Okay, so at the top left. Top middle, kind of. It says create credentials, API key, and then Avery Dev. So select the API services in the drop-down at the top. Does that drop-down work? Okay, yeah. So, yeah, so the ones that we're going to, let me just double-check on the ones we're searching for. So, what are the Google...

**Patrick McCreary** (00:30:55)
What am I going?

**Avry Stroeve** (00:30:58)
So, I'm going to ask... Which specific ones, but I'm pretty sure it's just the vision ones. So you're going to do Google Cloud Vision. So look, search vision.

**Patrick McCreary** (00:31:13)
And I'll have that on.

**Avry Stroeve** (00:31:14)
That one's not there. Cloud, strictly check only. But you added it there. Cloud Vision, Google Cloud APIs, Service Management, Telemetry API, select API. Oh, wait, are these API restrictions? Oh, okay. I mean, yeah, yeah, it's fine. Okay, so then create that one. And then you'll also, oh, wait. Okay, so it is asking us to select which API has to actually use, not the restrictions. Okay, so the ones that you have are Google Cloud. Vision, but that one's not showing up. You also have Google Document, and we need the exact names of the API. Yeah, you might just be able to see that. So you don't have any there. You might have also configured an OAuth. Oh, that sounds familiar. Yeah, so that's, if you go to, so you have two service accounts. If you, yeah, data access, click data. Oh, wait, go back. Click data access. Okay, so you haven't done any of that. That's soon. Oh, click audience. You might not even be using Vision API, actually. If you I haven't configured this. Go, so click on the waffle and then go back to API and then credentials one more time. Credentials is right there. Yeah. Okay, cool. So your service account, so you have two, compute ad developer, and then you don't have any OAuth client IDs. You may, yeah, and then your API key currently doesn't have any permissions scoped. So I don't know if you're even using this or not.

**Patrick McCreary** (00:33:34)
This Versailles OCR invoker, that's what's reading the invoices.

**Avry Stroeve** (00:33:41)
Okay, got it. Well, maybe I'll just use that then. So can you click on that? And then, okay, and then can you send me this screenshot of this specific one? How do you do a screenshot on a Mac?

**Patrick McCreary** (00:34:11)
don't even remember. Shift Command 4. Command 4.

**Avry Stroeve** (00:34:14)
Shift Command 4. And then it's a drag and drop, like you have to drag and select, I guess, is what that one does. Or you can do Shift Command 5 and it'll take a full screenshot.

**Patrick McCreary** (00:34:44)
Okay, cool. And I'm just going to look at your screen real quick.

**Avry Stroeve** (00:35:17)
it says, okay, so it says, still OCR invoker, it has a service account, which is, so I want to have this thing locked and loaded by Friday. Okay. Yeah.

**Patrick McCreary** (00:36:00)
They be able to use it for month-end inventory, and they need time to upload all the invoices. Okay.

**Avry Stroeve** (00:36:06)
So, Friday deadline, but preferably before that.

**Patrick McCreary** (00:36:10)
Yep. Like I said, man, it's really close, it seems like, but once you start using it, it just seems to fall apart. Yeah.

**Avry Stroeve** (00:36:33)
While that's what each Google Key does... Okay, can you click Permissions at the top of your page in the Vercel OCR Invoker, top middle permissions?

**Patrick McCreary** (00:37:41)
Manage Access.

**Avry Stroeve** (00:37:44)
Yep, look for Role Document AI API User. Okay, look for Role Document. Can you search Document API? Just search Document and see if anything pops up. You meant, okay, so yeah, you'll do the document.ai, API user, document.ai, editor, administrator, let me just let it know. So there's viewer, editor, and administrator for the document.ai, there is viewer, editor, and administrator. Okay, so Document API. Can you just click View Additional Results?

**Patrick McCreary** (00:39:13)
And is there Document?

**Avry Stroeve** (00:39:15)
Okay, AI API User, that one right there. Wait, below that? Yeah, search Document again, and then scroll down to Document AI API User, that one right there.

**Patrick McCreary** (00:39:35)
And save.

**Avry Stroeve** (00:39:37)
Let me see if we have to add another role before we keep going. Okay, Generate JSON Keys. Okay. Cool. Create. That's not where you're going to try to save you. Okay, Vision. Generate the JSON key, this becomes a Google document, here, it turns to count. Okay, so what I'm going to do, just because this is probably going to take more than a little bit, and I don't know, do you have time to figure this out real quick in 10 minutes? Otherwise, what we can do, I can just like, do a quick check with my own Google keys, and a development environment, so that I can make sure it's actually working. And then, when we hop back on a phone again, I can actually show you the exact step-by-steps to make sure the keys are working on your end, as well. But, I don't know how much time you have, I guess, is what I'm wondering.

**Patrick McCreary** (00:40:56)
No, can you share your screen? I want to see what you're doing with it. Yeah, here.

**Avry Stroeve** (00:41:01)
So in my terminal, I'm just like I already pulled down the whole project and I'm basically just asking it to set us up with the exact keys that I need in the environmental variable file right here. And what you have are you have your Supabase keys, your Google Cloud, and then your OCR worker, and then you have your OpenAI keys, your Resend keys. And basically what I was doing is just going through step by step and setting these keys so that when I go to actually work through this and do everything, that it would actually work and do everything properly. So what we're running into right now is in the Google Cloud Console, like I could probably click around and do things way faster if it was on my Google Cloud Console, just because there. There's a lot of like just setting the proper keys and I didn't know how much time you have, but if you have time, then we can, then I'm happy to like, we can keep going through this. But basically we have to set the service account with the document AI API user and make sure that that has like access to this API, this specific type of API. And then you would generate the JSON keys and then create the Vision API key, which would go in the environmental variables. And then that would be able to use all of it. But for now I can actually go create all of these myself, test it, make sure it's working. And then when we hop back on the call, then we can actually put, or like, I can, I mean, it's already working on your end, but we can just make sure that the keys are actually like properly set on your end.

**Patrick McCreary** (00:42:59)
So yeah, think.

**Avry Stroeve** (00:43:00)
think that would be the next best step instead of, like, going through a troubleshooting session for the next hour, whereas I can just, on your accounts, whereas I can just test it all with my demo ones and then take it from there. Okay, cool.

**Patrick McCreary** (00:43:14)
All right, awesome. And then once you're done with this, I've got another one you can help me finish, okay? Okay, sounds good.

**Avry Stroeve** (00:43:22)
Yep, and then I know your deadline, so I might not be able to get back to you by the end of today, but definitely by Monday. Or Tuesday, tomorrow, or the next day. We can hop back on the phone. Cool. All right. Okay. Yeah, well, just make sure, I mean, if you are going to go, like, complete it, let me know, but I'll be able to, like, work on it right now.

**Patrick McCreary** (00:43:44)
It's all you. It's all you. Sounds good. All right. Talk to you soon. Have a beautiful day. Thank you.
