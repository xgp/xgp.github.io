---
slug: luxury-belief-open-source-license
title: "The Luxury Belief of the Open Source License"
date: 2026-09-26
authors: [xgp]
description: "An interesting summary goes here to use in the meta description only"
---

## **The license as a halo**

Spend enough time in the Keycloak community and you will hear a particular argument, offered as though it settles everything. Keycloak is Apache 2.0. Anyone can take it, fork it, host it, sell it. And because of that, the reasoning goes, the people who build it stand on higher ground than the people who build Elasticsearch, or Redis, or Terraform. The license is not just a legal instrument. It is a character reference.

<!-- truncate -->

The people making this argument are not hobbyists. They are, for the most part, principal and senior engineers employed by Red Hat, an IBM subsidiary, whose full-time job is to maintain Keycloak and whose compensation sits comfortably in the top few percent of the profession. They did not choose Apache 2.0. Red Hat chose it, years ago, for reasons that had everything to do with Red Hat's business and nothing to do with the moral standing of the engineers it would later hire.

That is the pattern I want to name. Not Keycloak specifically, which is excellent software maintained by capable people, but the belief that has grown up around it and around dozens of other corporate-sponsored projects: that a permissive license, chosen by an employer, confers virtue on the employee, and that a restrictive license, chosen by a different employer, reveals a moral failing in theirs. It is a belief that costs nothing to hold when someone else is paying your salary, and it says more about the holder's position than about the software.

## **Why this is a luxury belief**

Rob Henderson coined the term "luxury belief" for ideas that confer status on the people who hold them while the costs fall on people who don't. The classic examples are social, but the structure is general: a belief is a luxury when you can afford to hold it precisely because you are insulated from its consequences.

License purity fits the structure exactly. An engineer at Red Hat can champion permissive licensing without limit, because nothing in their life depends on whether Keycloak, as a project, ever recovers its own development costs. Their salary is funded by RHEL subscriptions, OpenShift, and IBM's balance sheet. If AWS launched a managed Keycloak tomorrow and captured every dollar of hosting revenue, the engineer's paycheck would arrive on schedule. The license is free for them in every sense of the word.

Now put the same belief in the hands of a forty-person company whose only product is the thing they open-sourced. For them, the license is not a moral position. It is the difference between existing and not existing. When the person insulated from the consequences lectures the person exposed to them about purity, that is not principle. That is status signalling with someone else's money.

The tell is that the virtue always attaches to whatever the speaker's employer happened to choose. Nobody at a permissively licensed project argues that copyleft is the higher calling, and nobody at a copyleft project argues that Apache is. The conviction tracks the paycheck with remarkable precision.

## **What Bob Young understood**

In 2001, when Bob Young, the co-founder of Red Hat, sat on the board of a company I was working for, I had a conversation with him about exactly this subject. What struck me then, and what has stayed with me, is that he had no illusions about what Red Hat was doing. Red Hat did not distribute Linux under the GPL because the GPL was righteous. It distributed Linux under the GPL because that was the license Linux came with, and Young had worked out how to build a company on top of it anyway: sell the assurance, the packaging, the support, the certification, the trademark. Sell everything except the code, because the code was the one thing you could not sell.

That was a business insight, not a moral one. Red Hat's genius was recognising that in a market where the software is free, the scarce thing becomes trust, and trust can be priced. Every license decision Red Hat has made since follows from that same logic. Fedora and CentOS existed to build the funnel. The 2023 decision to restrict RHEL source distribution to paying customers existed to protect the top of it. Keycloak is Apache 2.0 because Red Hat wants the broadest possible adoption of an identity layer that feeds directly into Red Hat's supported build, its OpenShift ecosystem, and IBM's consulting arm.

None of this is a criticism. It is the model working as designed. But it means that when a Red Hat engineer holds up Apache 2.0 as evidence of the project's purity, they are holding up a go-to-market strategy and calling it a conscience. Bob Young would have laughed at that. He knew the license was the shape of the business, and he was honest enough to say so.

## **Permissive licensing is a privilege of the large**

Apache 2.0 is affordable for Red Hat for the same reason a bank can leave its vault door open in a town where it also owns the police force. Red Hat monetises Keycloak indirectly, through subscriptions to its supported build and through the gravitational pull of its platform. It does not need to capture hosting revenue, because hosting is not where Red Hat makes money. If a hyperscaler forks Keycloak, Red Hat loses very little, and may even gain, since more Keycloak in the world means more demand for the vendor who knows it best.

Elastic, MongoDB, Redis, and HashiCorp were in a different position. Their products were the business. Their revenue came from selling the hosted version of the thing they gave away. And beginning in the late 2010s, Amazon Web Services demonstrated with great clarity what a permissive license means when your competitor is the largest infrastructure company on earth: AWS took the code, ran it as a managed service, kept the hosting revenue, and contributed back roughly nothing.

So they changed the terms. MongoDB moved to the SSPL in 2018\. Elastic moved to the SSPL and the Elastic License in 2021, and AWS responded by forking OpenSearch. HashiCorp moved Terraform to the BSL in 2023, and the OpenTofu fork followed. Redis moved to the RSAL and SSPL in 2024, and Valkey was forked under the Linux Foundation. Elastic and Redis have since each added AGPL as an option, which tells you the goal was never to escape open source. It was to stop subsidising Amazon.

These companies were pilloried for it, often by engineers whose employers had never faced the same threat. But look at the decision from inside each company. A source-available license with a managed-hosting restriction is the only tool a mid-sized vendor has against a competitor with a hundred times its capital. Choosing it is not a betrayal of principle. It is the same calculation Red Hat makes, arriving at a different answer because the inputs are different.

Permissive licensing, in other words, is not a virtue. It is a luxury. It is what you can afford when you are big enough that nobody can eat you.

## **We have grown beyond Stallman, and that is fine**

The original idea was Richard Stallman's, and it was a moral one. Software should be free because users deserve control over the tools they run. Stallman built the GNU project and wrote the GPL to guarantee that freedom, and it is worth remembering that the GPL is itself a restrictive license. Copyleft forbids things. It forbids taking the code proprietary. Stallman chose restrictions deliberately, because he understood that an unrestricted commons gets enclosed. The permissive-license purists of today are, ironically, further from Stallman than Elastic is.

But Stallman's world was one where a single brilliant programmer could write a compiler, an editor, or a shell. The software that matters now is not like that. A production identity provider, a distributed search engine, a cloud-native database: these are the work of hundreds of engineer-years, sustained over a decade, by people who need to be paid a great deal of money because the alternative employers are Google and Apple. Nobody writes Keycloak in a garage. Red Hat writes Keycloak, with a budget line and a product manager and a quarterly roadmap.

That investment has to be recovered, and the license is the instrument of recovery. Every open source business model is a bet about where the money will come from once the code is free: support, hosting, a proprietary tier, a trademark, an ecosystem, a distribution. The license is tuned to protect that bet. Google released Kubernetes under Apache 2.0 not out of generosity but to commoditise the layer above AWS's lock-in. Red Hat releases Keycloak under Apache 2.0 to feed its platform. Elastic restricts managed hosting to protect its cloud. Same species of decision, three different habitats.

This is not a fall from grace. It is what maturity looks like. The open source model won so completely that it now underpins most of the world's infrastructure, and infrastructure at that scale cannot run on volunteer labour and moral sentiment. It runs on business models. Pretending otherwise does not honour Stallman. It just makes it harder to talk clearly about who is paying for what.

## **The paycheck knows**

I want to be careful here, because the engineers I am describing are not villains and mostly are not cynics. Most of them believe what they say. They grew up on the Cathedral and the Bazaar, they contribute in good faith, and they experience their work as a public good. In many respects it is one.

But sincerity is not the same as accuracy. An engineer can be entirely sincere about the virtue of permissive licensing and entirely wrong about why their project has it. The decision was made above their pay grade, by people whose job title includes the word "revenue", and it was made to serve the company that signs their cheque. The engineer may be blissfully ignorant of that. Their paycheck is not. It arrives every month precisely because the license does what the business needs it to do.

There is a corporate equivalent of the ivory tower, and corporate open source is where it lives. The engineer at a large vendor is shielded from the market by layers of institution. They never see a pricing meeting. They never watch a competitor take their product and undercut them with it. They never have to make payroll. And from inside that shelter, the decisions of people who are not sheltered look like moral failures rather than survival.

The honest version of the Keycloak engineer's position is this: "My employer chose a permissive license because it serves my employer's strategy, and I benefit from that choice." That is defensible. It is even admirable, in its way. What is not defensible is converting it into a claim about character, and using that claim to wave away every criticism of the project as the resentment of the less pure.

## **The outsiders who dare to make money**

The purity argument has a companion, and it is the uglier of the two. Watch what happens when someone outside Red Hat builds a business on Keycloak. A consultancy that sells Keycloak implementations. A small vendor that offers hosted Keycloak. A company that sells a commercial extension, a theme pack, a migration tool. The reaction from inside the project is often not gratitude, or even indifference. It is resentment. These people are "profiting from our work". They are "taking without giving back". They are, in the moral vocabulary of the community, freeloaders.

Consider how strange this is. The license that the community holds up as its badge of virtue is a license whose entire purpose is to permit exactly this. Apache 2.0 does not merely tolerate commercial use by third parties. It invites it, in plain language, with a patent grant thrown in to make sure nobody hesitates. A project cannot choose the most permissive license in common use and then act wounded when people exercise the permission. That is not a principle being violated. That is the principle working.

It is also self-defeating. Every consultancy that sells Keycloak implementations creates Keycloak deployments. Every small host that runs it creates Keycloak users. Every extension vendor makes the platform more capable and more sticky. The outsiders' profit is the project's growth, and the project's growth is precisely what Red Hat wanted when it chose the license. The freeloaders are doing the marketing.

And then there is the question of who profits most. It is not the consultancy. It is Red Hat, which converts community adoption into subscriptions for its supported build, into OpenShift deals, into IBM services engagements, and which pays its engineers handsomely out of the proceeds. The engineer who resents an outsider for making money from "their work" is drawing a salary that is, in its entirety, money made from their work by someone else. The only difference is that the someone else is their employer, and the arrangement has been normalised to the point of invisibility.

At least Elastic and Redis were honest. When they decided they did not want hyperscalers profiting from their code, they changed the license and took the criticism. They did not keep the permissive license, keep the moral credit that comes with it, and then sneer at the people who took them at their word.

## **What an honest conversation would sound like**

None of this requires anyone to stop using Apache 2.0, or to stop preferring it. Permissive licenses are good for adopters, and adopters are allowed to want them. The argument is narrower: the license is a business instrument, and it should be discussed as one.

That means four things. First, when a company changes its license, the interesting question is not whether it has sinned but what threat it is responding to and whether the new terms are a reasonable answer. Second, when a company keeps a permissive license, the interesting question is what business model makes that affordable, and who is actually paying. Third, when an engineer invokes their project's license as a shield, the right response is to ask, politely, who chose it and why. Fourth, when an outsider makes money from a permissively licensed project, that is the license doing its job, and the people who chose the license have forfeited the right to complain about it.

Bob Young built the first great open source company by refusing to confuse the license with the business. Three decades on, the industry has largely adopted his model and largely forgotten his candour. We could stand to recover it. The code may be free. The people who write it are not, and the license they work under was chosen by the people who pay them. That is not a scandal. It is just the truth, and it would be a healthier ecosystem if more of the people inside it could say so.
