# Make or Buy? Assemble!

Buy a vendor solution or build it yourself? This is a question that frequently comes up in IT departments. The classic answer distinguishes core and context, and invites to build your core business tools (implied: those that are differentiating) and buy what makes the context. But does this binary approach stand up to the test of experience?

![From ERP to specialized software to ERP?](/images/blog/1oYsp7VM9OfsizRMLFj0q2Q.webp)

## Some elements of commercial software market history

The software market has experienced a significant pendulum movement in 20 years. In the beginning were **ERPs and their promise to unify all company activity** (production management, accounting, customer files, etc.). These solutions captured most of IT departments' energy and enabled the emergence of very large groups. But their strength also constitutes their great limitation: coloring is easy as long as you don't reach the edges; similarly, it's difficult for an ERP to address all the specificities of each business unit, their recompositions, etc.

Between 2005 and 2015, the slogan was "*there's an app for that!*". Each of us has specialized applications on our phone (those that succeeded did so because they responded very efficiently to one need, and only one) and, in the wake, **each micro-function of the company (even those that had to make do with Excel for a long time) was able to benefit from tools very adapted** to their needs.

The pendulum swing is happening. For 5 to 8 years, each application publisher has been trying to conquer new markets and for that to **cover a broader functional scope, until becoming ERP-ized**. **IT departments find themselves having to juggle** with:
- Multiple CRM tools (the generalist CRM, the segmentation tool, the marketing automation tool, the email cannon that claims to be a CRM, the retargeting tool, the more or less omnichannel contact center, the ticketing tool, etc.) or even more if business units have made autonomous choices,
- Several ERPs (but why is it the solution specialized in stock management and production batch scheduling that manages quotes and customer orders for such business unit?)
- N HRIS (the solution chosen to manage training was actually a complete HRIS, by the way the one to manage payroll too, but it's also an ERP), etc.

Add to this publisher mergers and acquisitions, reboots leaving on the technological obsolescence sidelines the flagship solution you bought 5 years ago and whose integration you just finished at great expense, and you understand **the daily life of many IT departments and their infernal cycle of ERP replacements every 5 years** (understand, given the above, that they actually only change 20% of the IS, so the oldest ERP still running at your place is probably 25 years old and is cursed by every newcomer).

Under these conditions, it's difficult to consider software as a durable asset of the company. And when it is durable, it's not by its own merits but by the considerable energy needed to make it evolve.

## The difficulty of delimiting the core from the context?

How to distinguish core and context without cutting off an arm, or conversely reinventing the wheel? The arbitration is not always easy. Some may limit the core to the company's product alone... but in some cases, this is very restrictive when we know today that the choice of a brand depends on the B2C side essentially on customer experience, where customer relations play a role at least as important as the product.

Beyond this "customer visibility" aspect, a second axis comes into play when talking about software: the notion of technological maturity. Simon Wardley proposed an interesting approach consisting of **mapping on a "customer visibility x technological maturity" benchmark**. This approach allows us to get out of the dualism between *make* and *buy*.

![](/images/blog/1zyiaJJW3mX2vfm-4aKqzhA-1024x626.webp)

## The third way: assemble!

On this technological maturity path, a number of solutions have become "commoditized". For example, **you can now do text-to-speech without any machine-learning knowledge**, via a simple API call. But how does the "*assemble*" approach differ from "*buy + integrate*"?

The company that buys solutions and integrates them ultimately has N applications each with its own database, each relying on its own representation of the business process, each depending on the roadmap (and lifecycle) of its publisher, where it's often impossible to hide unnecessary screens through adequate role management (not to mention user identity management, which is often part of the super expensive premium package). To these applications, you must add a bunch of ETL or ESB jobs that often make a spaghetti mess.

In such an ecosystem, IT is filled with people who have no focus on the company's business. **The "*assemble*" approach is actually radically different.** In this approach, we no longer buy packaged publisher products, but building blocks to assemble into a unique (and unified) product controlled internally. These blocks have a **much more stable lifecycle** than publisher solutions, because they respond to the specialization logic that was the "second age of software" I described earlier; they don't rely **on a data silo**; we mobilize **only those that are necessary**.

Moving to an assembly model requires a high level of dialogue between IT and business units:
- On the business side, this requires giving up choosing your own solutions (often based on pretty dashboards that no one will consult once the solution is launched) by giving in to sales harassment and preferring to express needs to your IT department;
- On the IT side, it means **adopting a *customer-oriented builder* mentality**, moving away from over-specialization (a front-end dev can no longer be complacent in their web-design expertise alone and must think solution to really do UX) with the development of an essential skill, that of **solution architecture (which must be distributed** in teams and not just the prerogative of an out-of-touch architecture cell).

Need help building this culture? With [TerraCloud](../../../../../index.html), I help you spread this solution architecture mentality in your teams and mobilize the cloud toolbox/lego to build the solutions that will allow you to support your business of tomorrow (and the day after tomorrow!).
