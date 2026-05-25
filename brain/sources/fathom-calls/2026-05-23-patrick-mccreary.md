---
title: "Patrick McCreary - Define the inventory automation workflow and data..."
meeting_title: "Impromptu Google Meet Meeting"
date: 2026-05-23
duration: 34
recorded_by: "Avry Stroeve"
fathom_account: avrystro@gmail.com
domains_type: one_or_more_external
transcript_language: en
participants:
  - name: "Avry Stroeve"
    email: avrystro@gmail.com
    role: internal
fathom_id: 149061416
fathom_url: https://fathom.video/calls/684721051
share_url: https://fathom.video/share/PW6kS-j7P-kBWs9dYy8x4D5FZX9ze6mZ
tags: [app-development, inventory-automation, supabase, ocr, voice-flow, master-database, food-cost, monthly-close]
status: enriched
projects: [rmce-inventory-control]
captured_to: [rmce-inventory-control]
captured_date: 2026-05-23
unknown_speakers: [Patrick McCreary]
---

## Summary

## Meeting Purpose

[Define the inventory automation workflow and data requirements.](https://fathom.video/calls/684721051?tab=summary&timestamp=34.0)

## Key Takeaways

  - [**Automate two workflows:** 1) Daily receipt scanning to track purchases and update pricing, and 2) Monthly voice-to-text inventory counting to value on-hand stock.](https://fathom.video/calls/684721051?tab=summary&timestamp=686.0)
  - [**Build a master database:** This database must store items by specific pack size (e.g., 50lb bag vs. 6x1lb boxes) and brand, as each variation has a unique price.](https://fathom.video/calls/684721051?tab=summary&timestamp=950.0)
  - [**Generate a monthly Food Cost %:** The system must calculate this by combining beginning inventory, total purchases, and ending inventory.](https://fathom.video/calls/684721051?tab=summary&timestamp=1334.0)
  - [**Unblock development:** Patrick funded the OpenAI API with $10 to resolve a quota error that was preventing testing of the voice-to-text feature.](https://fathom.video/calls/684721051?tab=summary&timestamp=1649.0)

## Topics

### Current Manual Workflow

  - [**Daily:** An accountant manually enters invoice totals into a general ledger.](https://fathom.video/calls/684721051?tab=summary&timestamp=1498.0)
  - [**Monthly:**](https://fathom.video/calls/684721051?tab=summary&timestamp=1509.0)
      - [A chef manually updates item prices in a master Google Sheet using vendor reports.](https://fathom.video/calls/684721051?tab=summary&timestamp=445.0)
      - [The chef then manually counts on-hand inventory and enters quantities into the same sheet.](https://fathom.video/calls/684721051?tab=summary&timestamp=460.0)
      - [The accountant uses these totals to calculate the monthly food cost percentage.](https://fathom.video/calls/684721051?tab=summary&timestamp=1363.0)

### Automated Workflow Requirements

  - [**1. Scan Purchases (Daily)**](https://fathom.video/calls/684721051?tab=summary&timestamp=686.0)
    
      - [**Goal:** Automate daily tracking of all purchases and keep the master inventory database updated with the latest prices.](https://fathom.video/calls/684721051?tab=summary&timestamp=286.0)
      - [**Process:**](https://fathom.video/calls/684721051?tab=summary&timestamp=686.0)
          - [The system scans invoices (via photo or CSV upload).](https://fathom.video/calls/684721051?tab=summary&timestamp=699.0)
          - [It extracts all line items (item name, pack size, quantity, price).](https://fathom.video/calls/684721051?tab=summary&timestamp=801.0)
          - [It logs these purchases in the database.](https://fathom.video/calls/684721051?tab=summary&timestamp=1112.0)
          - [It updates the master inventory database with the latest price for each item/pack size.](https://fathom.video/calls/684721051?tab=summary&timestamp=286.0)
      - [**Manual Entry Fallback:** For unreadable receipts, the app needs a form with multiple item entry fields, not just one.](https://fathom.video/calls/684721051?tab=summary&timestamp=727.0)

  - [**2. Count Inventory (Monthly)**](https://fathom.video/calls/684721051?tab=summary&timestamp=1242.0)
    
      - [**Goal:** Automate the monthly valuation of on-hand inventory.](https://fathom.video/calls/684721051?tab=summary&timestamp=1242.0)
      - [**Process:**](https://fathom.video/calls/684721051?tab=summary&timestamp=686.0)
          - [The chef records a voice memo while counting stock (e.g., "6 boxes of Uncle Ben's rice").](https://fathom.video/calls/684721051?tab=summary&timestamp=1242.0)
          - [The system transcribes the memo and matches items to the master database.](https://fathom.video/calls/684721051?tab=summary&timestamp=1242.0)
          - [It calculates the total value of the counted stock using the latest prices.](https://fathom.video/calls/684721051?tab=summary&timestamp=1242.0)
          - [This total populates the "End of Month Inventory" field in the monthly close report.](https://fathom.video/calls/684721051?tab=summary&timestamp=1201.0)

  - [**3. Monthly Close Report**](https://fathom.video/calls/684721051?tab=summary&timestamp=1140.0)
    
      - [**Goal:** Automatically generate the monthly food cost percentage.](https://fathom.video/calls/684721051?tab=summary&timestamp=1363.0)
      - [**Formula:**](https://fathom.video/calls/684721051?tab=summary&timestamp=1334.0)
          - [Beginning Inventory (from prior month's close)](https://fathom.video/calls/684721051?tab=summary&timestamp=1140.0)
          - [`+` Purchases (from daily scans)](https://fathom.video/calls/684721051?tab=summary&timestamp=1334.0)
          - [`-` End of Month Inventory (from voice count)](https://fathom.video/calls/684721051?tab=summary&timestamp=1334.0)
          - [`=` Cost of Goods Sold (COGS)](https://fathom.video/calls/684721051?tab=summary&timestamp=1334.0)
          - [`÷` Food Sales (manually entered by accountant)](https://fathom.video/calls/684721051?tab=summary&timestamp=1363.0)
          - [`=` Food Cost Percentage](https://fathom.video/calls/684721051?tab=summary&timestamp=1363.0)

### Master Inventory Database

  - [**Structure:** Must be built in Supabase to support the new workflow.](https://fathom.video/calls/684721051?tab=summary&timestamp=540.0)
  - [**Content:** A master list of all ingredients, organized by category (e.g., Kitchen Sauté, Dry Goods).](https://fathom.video/calls/684721051?tab=summary&timestamp=252.0)
  - [**Key Requirement:** Store items by specific pack size and brand, as each variation has a unique price.](https://fathom.video/calls/684721051?tab=summary&timestamp=950.0)
      - [**Pack Size:** Quantity (e.g., 6x1lb boxes) or weight (e.g., 50lb bag).](https://fathom.video/calls/684721051?tab=summary&timestamp=953.0)
      - [**Brand:** Hormel hot dogs vs. Jimmy Dean hot dogs.](https://fathom.video/calls/684721051?tab=summary&timestamp=976.0)
  - [**Logic:** The system must automatically add new items or pack sizes to the database as they are encountered on invoices.](https://fathom.video/calls/684721051?tab=summary&timestamp=921.0)

## Next Steps

  - [**Avry:**](https://fathom.video/calls/684721051?tab=summary&timestamp=2012.0)
      - [Develop the automated workflows for receipt scanning and voice inventory counting.](https://fathom.video/calls/684721051?tab=summary&timestamp=686.0)
      - [Build the master inventory database in Supabase, structured to handle pack sizes and brands.](https://fathom.video/calls/684721051?tab=summary&timestamp=950.0)
      - [Update Patrick tonight and schedule a follow-up for tomorrow or Monday.](https://fathom.video/calls/684721051?tab=summary&timestamp=2012.0)
  - [**Patrick:**](https://fathom.video/calls/684721051?tab=summary&timestamp=1649.0)
      - [Funded the OpenAI API with $10 to resolve a quota error, unblocking voice-to-text development.](https://fathom.video/calls/684721051?tab=summary&timestamp=1649.0)


## Action Items

*No action items*

## Transcript

**Avry Stroeve** (00:00:00)
I'm going to mute on my phone. Talk on the Google Meet.

**Patrick McCreary** (00:00:17)
Oh, share the screen?

**Avry Stroeve** (00:00:19)
No, I don't know. Mute on your phone. Okay, perfect. So what you said is you want to make sure, and I'll just share my entire screen. So, okay, so you want to make sure that these, you want to make sure that these, every single time that it uploads, it will grab all the details from every single type of receipt, essentially. And there's a ton of details on these, and I know you made sure to break it down so that it would autofill these, but do you need any other fields in this area to autofill? Like if we look through these side by side, which I'll bring this over, actually. So, Avry, these invoices like that Shamrock one you showed me, can I just walk you through the whole thing?

**Patrick McCreary** (00:01:32)
Yes, that would be great. Line items on it that say like fuel, Schaefer, CamGel, ethanol, 72, 6.34 ounces. Read the price, it's so small, but say 62 bucks. Okay, 82, 93. Yeah. I need that to go to the database, right? All of these, like each individual one?

**Avry Stroeve** (00:01:57)
Each individual line item to go to the

**Patrick McCreary** (00:02:00)
database. Okay. Okay. And then if there's a fuel surcharge or something like that at the bottom, that needs to go on the database. Okay. And then, and then what happens is when they count the inventory, it's using, wait, so this is used in two different places. So I also need the grand total of this for the purchases for the month. Okay. Okay. So categories, the categories need to be separated as well. Okay. So let's just go through this as an example.

**Avry Stroeve** (00:02:36)
So if we're using the shamrock foods, uh, one, what your team is normally doing that you want to automate essentially is they take each one of these line items that we're seeing and they add them to a database or a spreadsheet essentially. And, um, so that's the first thing is we need every single one of these line. items in the database getting tracked throughout the month. And they need to be separated by the proper categories, which currently the categories are produce, meat, seafood, dairy, dry goods, beverage, paper, chemicals, disposals, cleaning, smallwares, equipment, and other. Are there any other categories? Is this list complete? Is my first question. I'm pretty sure that's complete.

**Patrick McCreary** (00:03:30)
I'm pretty sure that's complete. Hey, I sent you a CSV file with our entire order guide with all of the prices. Okay. So, when I tell you that, the reason I say that is when it reads this invoice, it could kind of use fuzzy logic to say, hey, fuel chafing gel, it's this price. And it can match it up with that spreadsheet, and it can just update the price and verify the quantity. Like the past.

**Avry Stroeve** (00:04:01)
So you sent me a spread seat, let me pull that up too, which is this invoice sheet, okay.

**Patrick McCreary** (00:04:12)
So if you click on the tabs at the bottom, you can see how our guys divide it by category. See how they say sautier, dry goods, walk-in cooler, main freezer, pastry, all at the bottom. Yeah, oh I see, kitchen sautier, yeah, okay. Yeah, that's the categories we use currently, so maybe it'd be better to update the categories to that for now. Yeah, we'll just use those. Okay.

**Avry Stroeve** (00:04:41)
So what were you saying about the cross-referencing?

**Patrick McCreary** (00:04:46)
Yeah, so, okay, so two things really need to be measured here. One is how much we buy during that month, okay. And then second thing is... When we do buy this master spreadsheet, the pricing needs to get updated, okay? So if the price of lettuce went up by $2 a case, the master spreadsheet would go up by $2 a case.

**Avry Stroeve** (00:05:15)
Hmm, okay. I see. So you're going to continue to use this master spreadsheet in Sheets. You want to continue to update this? I thought it would be saved in database.

**Patrick McCreary** (00:05:32)
Okay.

**Avry Stroeve** (00:05:33)
So yeah, you want to essentially transfer this master spreadsheet in the count section of the master spreadsheet of everything happening.

**Patrick McCreary** (00:05:48)
I think so. So let me tell you the important things. So every month, at the end of the month, we get a number. Just hypothetically say it's $30,000. Okay. Then during the month we purchase, let's just say another $30,000 worth of groceries. Okay. We need to track every single one of those purchases to get an accurate number. Okay. Then we count the end of month inventory. So let's just say at the end of month, we have $30,000 of inventory on our shelves. We know we spent 30 grand in food.

**Avry Stroeve** (00:06:29)
Okay. And so that track, so a questions to get like, get it grounded in the reality of what the current situation is. So that number is currently getting tracked in this spreadsheet only, right? This spread, these, this is your source of truth or where?

**Patrick McCreary** (00:06:51)
I'm just saying we probably need, it doesn't have to be that spreadsheet. We just need a master inventory list that is constantly getting up. Updated as prices are changing and back sizes are changing. Okay.

**Avry Stroeve** (00:07:05)
So it would need to, like, if you had a human doing that specific task, every single invoice that came in, you would have them check the master inventory list. And is there, so is this the master inventory list, essentially?

**Patrick McCreary** (00:07:24)
That is. So, like, what our chef would do at the end of the month is he would pull down a report, a kitchen inventory report from Shamrock Foods with all the updated price. And he would go line by line through every single item and update the price. And then he would go count all the food on our shelves, and he would put that food, the quantity and back size in here. He would input every single one of those. And we're trying to automate that. Yeah. That's what this is.

**Avry Stroeve** (00:07:53)
I see. I see. So the count inventory. Got it.

**Patrick McCreary** (00:07:57)
okay, I see.

**Avry Stroeve** (00:07:58)
I'm starting to see the work. So the first thing that you wanted is every single receipt needed to be scanned and added in the line item. Like every single one of these line items needs to be added. Then the next part of it is once every one of those is getting added line item by line item, which currently as a source of truth, this is where that's happening or where else is that currently happening? Where these receipts, like besides this spreadsheet right here, which I'm assuming is the master inventory list. Is there another list where you guys are currently adding all these line by line?

**Patrick McCreary** (00:08:43)
So our guys are actually just doing this manually every single month near the end of the month where they're adding that. My accountant is adding all of the invoices, right? And then at the end of the month, yeah, but I, what I believe from vibe coding it was that. Supabase built this database for me already. You should be living.

**Avry Stroeve** (00:09:04)
Yeah, Supabase did build a database. The ability for it to actually append things accurately is part of the code, and the code is what you want to make sure works. But, yeah, the Supabase is already there, and here's the different tables that you have. these, honestly, like, eventually you'll probably want to clean them up because I don't know if you're using all of them. But, let me see, inventory items. So, okay, so you have something like inventory items where you have each one of them. But, so basically, if, from what you have currently, like, I can make sure the Supabase actually works properly and looks good, but to start with some sort of source of truth for the Supabase to mirror off of, which you already did, I understand. But for me to make sure it actually works is this is currently the source of truth where every single month they are going through and this is the totals. So these are the month end totals of April and March and every single month they go in here and they go through kitchen and they look at these and they count every single item. Count every single item with the count and the quant okay but these are quantities so this is what it costs these are what each item costs currently that's what they're going to go through and they're going to use that voice reader and they're going to say coating paint spray um I have um one can and the

**Patrick McCreary** (00:11:00)
The agent is going to do the math, and it's going to add the price that one can do his inventory. And then he's going to go through and say, honey, Clover, I have five jobs. And it's going to do the math, and it's going to add it to his inventory. And at the end, it's going to total it all up for him. So he knows exactly how much inventory he has on hand on that last day of the month. Okay. Yeah, and then, so there's a few things of input. So that input is going to happen at the last day of the month by the chef. And that is account inventory. That's account inventory. Okay. The scan purchases, that should happen almost every day. They should be taking pictures of invoices and updating them. Okay. I think there also needs to be an input to add, like, a CSV file from our venues. But I'm pretty sure we can use that same scan of purchases. But... Right. Yeah.

**Avry Stroeve** (00:12:02)
I added it so that it can choose from the files as well.

**Patrick McCreary** (00:12:06)
OK. And then I think that this area underneath here where it says like add a vendor, date, amount, the credit card, reference number, and then what it is, that's for like if you have a receipt that's all crumbled up that can't be read, you know, by the by the app. Like it's so messed up, but probably instead of having one item, you should probably have like 20 blanks, you know, for you to be able to add multiple or at least an add another, add another ingredient button or something, you know?

**Avry Stroeve** (00:12:39)
Yeah. So, OK, so these so this this specific part scan purchases is for this stuff. And did you send me all the different possible types of receipts?

**Patrick McCreary** (00:12:53)
All I did. All right. All right.

**Avry Stroeve** (00:12:56)
So you so that's for the first the first step of this work. Workflow is every single receipt that comes through. You need your team to either be able to scan it and take a picture, and it basically extracts the one line or each individual line item, or if it's just a receipt, it'll probably have, or yeah, so from receipts, you basically just need the item. The data that you need from this is the item name, so the description of the item. Honestly, all of this data is really good, so you'll, so for these.

**Patrick McCreary** (00:13:35)
Actually, it would be really cool if, when they had a receipt, if they could just search for the item. So they would search for broccoli, and then it would pop up what the broccoli choices are in the pack sizes. Happy birthday. Thanks. How are you? I'm so good.

**Avry Stroeve** (00:13:55)
How are you? Pretty good.

**Patrick McCreary** (00:13:57)
I like the outfit. I like the you. Max got me the belt. Oh, nice. Yes.

**Avry Stroeve** (00:14:07)
Okay, Patrick, can you repeat what you were saying real quick?

**Patrick McCreary** (00:14:10)
Okay, it'd be cool if instead of down here where you have to fill it in, it could search for an item because it's already going to have all this stuff in the database. So they could search for broccoli and whatever broccoli items and pack sizes we had in the database would pull up and auto-populate and they would just add the price.

**Avry Stroeve** (00:14:31)
Okay, so, yeah, so, so the, what is, what would be the point of that or like, what would they, so it would pull from the database. I understand that you, in your mind, you see this other backend database, which currently, if I'm not wrong, is this. This is the current backend database. Obviously, we're going to migrate this to. Superbase. But this is where it would pull from. So you need to make sure that you have a basically a list of all the different ingredients. And while this is for kitchen, Saussier is like, okay, so these are all ingredients.

**Patrick McCreary** (00:15:21)
Avry, we buy new items all the time too. So it also needs to be smart enough to take new items and add it to the system. And add it to the proper category. Yeah, and add it to the proper category. But, okay, so question for you.

**Avry Stroeve** (00:15:34)
This backend database is a master list of all ingredients. It's not going to have multiple listings of the same ingredient within it. It's just going to be a master list that's always updating with the most recent max price that you've paid for an ingredient. I disagree.

**Patrick McCreary** (00:15:51)
Okay, go ahead. I disagree. So sometimes we'll buy like, we'll buy things and it comes in different paths. So if I bought like bulgur wheat one day in a 50-pound bag, and then the next day I bought it in six one-pound boxes, I wanted to be able to store both. The pack size is really important. And also, sometimes they have different brands. I might buy Hormel hot dogs at one price, and I might buy Jimmy Dean hot dogs at another. I know it's too complex, but it's just the nature of the beast, you know?

**Avry Stroeve** (00:16:31)
No, I understand actually perfectly. So you have different pack sizes, and it needs to take into account, okay, it needs to check, hey, is this a current pack size we already have, or is this a new pack size? Yes, the pack size is measured in quantity or weight, it sounds like. Those are the two different pack sizes that you could have, a different type of quantity or a different type of weight.

**Patrick McCreary** (00:16:59)
Yeah, a lot of times. It'll say like 5, 16-ouncers, or sometimes it's bulk, just 10 pounds, you know? Okay, so yeah, that's... Some items are priced by the each, and some items are priced by the catch weight. So some, like ground beef, might be $5.29 a pound, you know, and another item might be $50 for the case of six, you know, two-pounders.

**Avry Stroeve** (00:17:31)
Okay, and you would have each of those listed in this master list, ground beef by the pound, and ground beef for a 50-pack. Yes. And, okay, so the master pack list would have the different ingredients and the different pack sizes within them, so nested pack sizes, essentially, which each ingredient has a different set of pack sizes. And whenever you take in a new receipt... ... It would need to be able to go into the database, check the current database to see what, first of all, match the ingredient. Then once you've matched the ingredient, match the pack size, and if the pack size does not exist, create a new pack size and update all of the values with the most recent amount that it costs for one unit of that pack size, essentially, right? That's what this master...

**Patrick McCreary** (00:18:27)
You got it, man. Okay. Yep. Okay.

**Avry Stroeve** (00:18:32)
So that's the first workflow, essentially, and that is for the scan purchases. This scan purchases then goes to the next step of this. So this gives you your total spent throughout the month on ingredients or on inventory, essentially. want And if you becomes

**Patrick McCreary** (00:19:00)
That goes to, that inventory goes to accounting, and accounting at the end of the month needs to be able to do what, or review what, or what, what, what does it, so click on monthly close, monthly close, yep, so then you would click on, let's just say the month of May, because that's what we're working on right now is May, and then down here at the bottom, okay, so where it says month in close, beginning inventory, so that should fill in with what the inventory was at the end of April, okay, so beginning inventory is the, is the, is the end of month from the previous month, okay, correct, yep, so just say hypothetically, that's 30 grand, okay, Okay. Then once you add it, this end of month inventory, that should fill in automatically from all of the voice transactions that added up when the chef is like counting off his inventory. That should add up and it should come out there.

**Avry Stroeve** (00:20:18)
When the chef is adding inventory or is that all of the receipts? No, this is the chef by voice.

**Patrick McCreary** (00:20:26)
The chef is like 10 pounds brown beef. He's walking through our warehouse and counting the items on the shelves. Okay. That's going to go.

**Avry Stroeve** (00:20:35)
And then the, the, the spreadsheet is then. So the workflow for that. Okay. I see. So then the workflow for that chef, the chef close the end of month inventory or the voice flow is the chef's going to be walking. And when he's talking, it needs to take that whole voice memo that he said. It would be cool if it can do it in real time, but I think he's going to first have to. Upload an entire voice memo. It's going to get the transcription from it. And then it's going to check each of those things he mentioned against the master database, same master database of inventory and what it currently costs, like the most up-to-date number of that inventory to then add all those up. And he, he'll also be saying like, it's this pack size or this, right? He'll say the pack size.

**Patrick McCreary** (00:21:29)
He, he might, he might just say like six boxes of Uncle Ben's rice. He might say that, you know, and he didn't mix up his words. So sometimes he'll say rice, six boxes, you know, so it could go either way.

**Avry Stroeve** (00:21:46)
Yeah. Okay. Um, cool. So he's going to be doing that month end inventory and it also has to go back into this same spreadsheet, find that line at, find each line item that he mentioned. And, and, and. Decide, okay, which pack list quantity or which quantity are we going to do? Are we going to total up? And then it needs to total all of those quantities up and that gets you this. Okay. And then.

**Patrick McCreary** (00:22:14)
So, okay. So the beginning inventory, say it was $30,000. Then there needs to be a box that says plus purchases. Okay. plus purchases is all those invoices we added, right? Okay. Yes. And then plus purchases. Plus purchases. Then end of month, minus end of month inventory. Got it.

**Avry Stroeve** (00:22:43)
Okay.

**Patrick McCreary** (00:22:43)
And then the accountant's going to put food sales for the month in that box. Okay. And it's going to divide it and it'll enter and that'll be where the food cost percentage shows up. Okay.

**Avry Stroeve** (00:22:57)
Okay. And that'll say hopefully 20.

**Patrick McCreary** (00:22:59)
Okay. 25% or 20%, yeah. Mm-hmm. Mm-hmm.

**Avry Stroeve** (00:23:04)
Okay. I see. That makes complete and total sense. So there's this spreadsheet, which is the main one they're using. There's these receipts, which we have for inputs, and you need to be able to not only have them just be able to take pictures of receipts and add those light items to a different data. So the other question is, currently, where is each line item getting tracked? Do you have another spreadsheet that you could send me for one of these months where they're tracking line item by line item by line item, all of the receipts?

**Patrick McCreary** (00:23:45)
I have no idea. That's pretty thorough. That's about the best you can get right there, Avry.

**Avry Stroeve** (00:23:53)
Well, the accountant, I guess. That's her job, right? She takes all of these receipts, and she's adding them line item by line item somewhere. right. All

**Patrick McCreary** (00:24:00)
Yeah, but I'm trying to get it to where we're not doing that. Yes, yes, I totally understand.

**Avry Stroeve** (00:24:05)
But does she, do you have access to the spreadsheet where she's adding all of these, or is she just keeping track of them by photo, and then she does it at the end of the month? Because my main question is, if there is a spreadsheet currently where all of these are getting added, then that is a really, really good structured piece of data that we could feed into this, and it would just make the job easier of actually, like, pulling all this data from these and putting them into that.

**Patrick McCreary** (00:24:36)
Well, that's why we're doing this. That would defeat the purpose of this. So we're trying to reduce manual labor. No, I understand.

**Avry Stroeve** (00:24:45)
Listen, what I'm asking is, do you currently have a different spreadsheet besides this one where she's adding them line by line to keep track of the information?

**Patrick McCreary** (00:24:58)
Okay. She just...

**Avry Stroeve** (00:25:00)
Her flow is usually she just comes in here and checks.

**Patrick McCreary** (00:25:04)
into the general ledger, right? And she just adds, like, the totals at the bottom. So my chef will code the invoices. And then once he codes the invoices, that's for those categories at the bottom. Once he codes those invoices, she goes in and puts the totals for each category. In here.

**Avry Stroeve** (00:25:26)
Yeah.

**Patrick McCreary** (00:25:28)
So she wouldn't do the individual line items. She would just do the totals for the categories. Got it. Yeah. She's not checking. The chef would go through the spreadsheet at the end of the month and update all the individual pricing.

**Avry Stroeve** (00:25:41)
Got it. Where do you see that? Just so I'm aware.

**Patrick McCreary** (00:25:45)
So it says, um, He's just updating the cost right there. It's just the right of the peak. Oh, yeah. Right here.

**Avry Stroeve** (00:25:56)
Okay. So, so each one, he walks. This spreadsheet, and he looks at this current one, and he says, okay, we paid, he finds the maximum amount that you've paid for this, and he adds the cost for one quantity, for a quantity of one for it.

**Patrick McCreary** (00:26:18)
Yeah.

**Avry Stroeve** (00:26:19)
Okay, got it. I see. Cool. So that, I mean, that makes sense. I don't think I have any other questions. I think I'm very, very clear on the whole.

**Patrick McCreary** (00:26:31)
That have workflows.

**Avry Stroeve** (00:26:34)
Is there anything else that I should ask you for? I have access to Superbase, Vercel. We'll just, when we convene again, I'm going to be working on this, and then we'll convene again, probably tomorrow, if you're available. Maybe Monday. But, okay, tomorrow would be best. And then... Um... is now And Yeah, I think, oh, for the voice flow. Okay. So the voice flow for counting the inventory, the API key for OpenAI to actually do the voice is currently, let's just see.

**Patrick McCreary** (00:27:20)
So, yeah, I can help. We're almost done. Yeah, we'll be done in like three minutes, five minutes, maybe.

**Avry Stroeve** (00:27:29)
Okay, the OpenAI key has hit quota. So can you do me a favor? Can you just screen share your screen and go to OpenAI? And let's just see if there is. Okay, so that is Google. And then go to OpenAI API key.

**Patrick McCreary** (00:28:03)
I probably have it open up here, but I can't really see it. Wait, wait, wait, wait.

**Avry Stroeve** (00:28:11)
Don't do it in the... Don't, don't, because then you'll be gone from that. I'll just switch this one.

**Patrick McCreary** (00:28:27)
Is it not letting you switch or type it in?

**Avry Stroeve** (00:28:41)
It's not letting me type.

**Patrick McCreary** (00:28:48)
Oh, I'm using... I got too many computers in front of me. Okay.

**Avry Stroeve** (00:29:16)
Okay, and then go to API keys in the left-hand side, right above, yep, okay, and then you already gave me that. One thing that we need to check is the usage, so go to usage, which is right above API keys in the left-hand side, and then, okay, so, oh, go to billing, sorry. Yeah, it's on the bottom left-hand corner, bottom left-hand corner, go to billing. And then add payment details, and then you can just top it up with like 10 bucks just so we can test it. Oh, I think it needs the CVC and the zip, and then you're good.

**Patrick McCreary** (00:30:40)
Let me grab my card real quick, okay? You're to me in trouble, man.

**Avry Stroeve** (00:31:19)
Yeah, sorry. I know they want you to come. This was actually a very helpful call, by the way, which I think if you have any other ideas, I think this should be the first step is doing something like this. Okay. And then it'll probably just ask you how much you want to add, and then you can just add like 10 bucks. I don't know if there's a minimum restore balance.

**Patrick McCreary** (00:32:44)
Okay.

**Avry Stroeve** (00:32:47)
Recharging. And then turn on the monthly recharge limit just in case this is a good failsafe. And then just do 100 bucks. Okay.

**Patrick McCreary** (00:33:06)
Couldn't update you. So I worked. All right. Sounds good.

**Avry Stroeve** (00:33:32)
I know you have to go. I'm going to go work on this and then I will text you later tonight with the update and then we can meet tomorrow. Awesome.

**Patrick McCreary** (00:33:40)
Thanks, Avry. Have a good night, man. See you.
