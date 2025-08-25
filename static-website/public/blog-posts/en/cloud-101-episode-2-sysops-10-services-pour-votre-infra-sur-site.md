# Cloud 101 - Episode 2 - SysOps: 10 Services for Your On-Premises Infrastructure

More and more organizations are indeed adopting a hybrid cloud model, keeping on-premises applications that have lower scalability or high availability requirements. In this context, the cloud's value is not limited to workloads hosted there.

After a [first article on the main value of the cloud](../../../10/17/cloud-101-episode-1-quelle-est-la-vraie-valeur-ajoutee-du-cloud/index.html) (TL;DR: align your IT teams with your business challenges), I offer you an overview of how **the cloud can help you manage your on-premises infrastructure**, with services some of which are free and others priced only on usage (without initial investment cost).

## 1. On-Demand Disaster Recovery/Business Continuity

A disaster can happen quickly 🔥, whether it's a fire in your on-premises infrastructure or in a datacenter (yes, even in a datacenter, see GlobalSwitch Clichy or OVH Strasbourg) or ransomware. With Disaster Recovery service, you can have near-synchronous replication of your machines to the cloud, with instances ready to start in case of incident (possibly from a backup point you choose in case of ransomware). At the end of the incident, you can repatriate your infrastructure on-premises (including modifications made since the beginning of the incident).

![](/images/blog/1699283880015-1024x671.png)

## 2. Inventory and Patch Management

One of the main AWS services for System Administrators is [AWS Systems Manager (SSM)](https://aws.amazon.com/systems-manager/features/). Among the many features of this service, it's possible to **manage your on-premises Windows and Linux machines for free**, in a unified way with EC2 instances. SSM Inventory allows you to centralize and easily visualize deployed operating systems, applied patches or not, but also the list of installed applications and packages, their version, and even list configured files or (for Windows) registry keys. SSM Patch Manager allows you to automatically apply OS and package updates by managing update waves/batches (e.g., test servers one day, production the next), policies (e.g., install critical patches at D0, less critical ones at D-7) and respecting maintenance windows defined for each application.

## 3. Observability

Not all IT departments have the capacity to maintain an ElasticSearch/Logstash/Kibana cluster, or the budget 💰 for Datadog. AWS's entire observability toolset can receive data emitted by your on-premises applications, without additional cost compared to cloud-hosted applications.

- **Logs** can be transferred to CloudWatch (they thus become easily queryable and can be converted to metrics to detect, for example, an abnormal increase in errors)
- **Metrics** (e.g., remaining disk space on your server) can be transferred to CloudWatch or to AWS Managed Service for Prometheus (and thus visualized with Grafana)
- **Application traces** can be processed by X-Ray (allowing you to analyze the cause of slowdowns, for example)

## 4. Bastion

Connecting remotely to a machine, via SSH (Linux 🐧) or remote desktop (Windows) without exposing the machine publicly, that's the purpose of a bastion. With SSM, it's possible to do this while having advanced features, such as logging all commands launched via the bastion or rights management by groups. In addition to interactive sessions, it's possible to define "run books," i.e., predefined command sets, allowing a user for example to restart a given service, without access to the entire machine. These runbooks can be triggered automatically, for example when detecting application unavailability.

## 5. Compliance and Security

Two examples of services in this area:

- Beyond update status/patch management, the AWS Config compliance tool also allows defining rules (e.g., "*no application runs with root user privileges on a Linux machine*") and detecting and tracking deviations for remediation.
- With AWS Verified Access, the Cloud can be a secure gateway to your on-premises applications: only traffic associated with authenticated users passes through, and it's possible to apply Web Application Firewall (WAF) rules.

## 6. Backup and Restoration

Particularly since the advent of cryptolockers, being able to have truly unalterable backups is key to being able to restore your systems. The cloud offers various solutions to synchronize your data, with the ability to go back in time ("*point-in-time recovery*"); for example:

- AWS Backup can [manage backups of machines in your on-premises VMware environment](https://aws.amazon.com/blogs/storage/backup-and-restore-on-premises-vmware-virtual-machines-using-aws-backup/).
- AWS DataSync can clone your network hard drives and maintain copies on the cloud.

In all cases, the underlying S3 storage allows you to keep these records (and their successive versions) in an unalterable and economical way (from $0.0036/GB/month!), without having to maintain tape backup systems yourself.

## 7. SD-WAN, Inter-Site Communication

If you have multiple sites distributed around the world, you can interconnect them (and connect them with your datacenters) by going through AWS's global network to minimize latency.

![](/images/blog/1699311094360-1024x535.png)

## 8. DNS and Content Delivery

Route 53 provides enterprise-grade DNS services that can manage your on-premises domains with advanced routing policies, health checks, and failover capabilities.

## 9. Identity and Access Management

AWS IAM Identity Center (formerly SSO) can serve as your central identity provider, managing access to both cloud and on-premises resources with single sign-on capabilities.

## 10. Cost Optimization and Analytics

AWS Cost Explorer and Trusted Advisor can help you analyze and optimize not just your cloud costs, but also provide insights for your hybrid infrastructure management.

## Conclusion

The cloud isn't just about migrating everything off-premises. It's about leveraging cloud services to enhance, secure, and optimize your existing infrastructure. These services allow you to get immediate value from the cloud while maintaining your on-premises investments.

Ready to explore how these services can benefit your infrastructure? [Contact TerraCloud](../../../../../index.html) for expert guidance on hybrid cloud strategies!
