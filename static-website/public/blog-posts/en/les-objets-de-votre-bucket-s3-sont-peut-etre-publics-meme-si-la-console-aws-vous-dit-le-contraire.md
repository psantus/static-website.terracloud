# Your S3 Bucket Objects Might Be Public Even If the AWS Console Says Otherwise

In this blog article, I show a little-known way your objects could become public by mistake.

![](/images/blog/https-dev-to-uploads.s3.amazonaws.com-uploads-articles-2atzrs9kam06a0cso3bt.avif)

S3 is an incredible storage service, capable of durably storing data at exabyte scale and presenting it with millisecond latency. While its name means "*Simple* Storage Service," its power comes with certain risks, one of which is discovering that your private data has become public. In this blog article, **I expose a little-known way your objects could become public by mistake**.

## How AWS Protects Your Data in S3

Let's start with a truism that must nevertheless be mastered: the fact that S3, as a *Web service*, is publicly accessible (meaning you can use the S3 API without configuring a VPN) does not mean that the data *must* be public. In fact, S3 buckets have always been private by default. And since 2018, there are additional locks at the account and bucket level that you can set to explicitly prevent objects from being public even if you mistakenly set a policy that could result in public access. And as of April 2023, these are enabled by default at the bucket level.

![](/images/blog/cb_account_settings_5.png)

With great power comes great responsibility! AWS's shared security model states that the user, who has the power to set policies to allow public access, is then responsible for its proper implementation. Here are the standard methods that can be used to set permissions in S3:

**Via Access Control Lists.** ACLs are no longer recommended but can still be used to grant access to S3 resources (buckets or objects).

**Through resource-based policies.** Each bucket has a policy that can authorize (or explicitly deny, which always takes precedence) access to objects. This is the recommended method to proceed, as it's easy to set granular permissions and also grant access to other AWS accounts or AWS services.

**Through IAM identity-based policies.** Make sure not to use *action = s3:** and *resource = **!

Each of these permissions can be overridden [with the "Block Public Access" settings mentioned above](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html).

## So How Could Your Objects Still Be Public?

Besides the well-known (and voluntary) model of using CloudFront CDN distributions to make S3 data publicly accessible, there are two ways to inadvertently make your S3 objects public. The reason I wanted to write this blog article is that I recently discovered these two leaks at one of my clients. They had an S3 bucket that was displayed as "public access blocked" in the AWS console, but data was leaked through these two security flaws.

### API Access Key / Secret Key Leak

The first way data could leak was because my client had distributed the API access key and secret key in a frontend application. In their case, the application was a mobile app, but it was still code running client-side that could be decompiled/reverse-engineered/memory dumped. The good news is that AWS proactively scans the Web (which obviously seems to include app stores rather than just scanning public repositories) for secrets and warned my client that this particular API key was available.

### Cognito Identity Pool Unauthenticated Guest Feature

The second way is more subtle. Cognito Identity Pools offer the ability to provide short-term credentials in exchange for proof of authentication issued by an identity provider. This proves very useful, for example, to allow everyone in the marketing department to access files in the S3 bucket or to allow user `JohnDoe` to access only files in the bucket prefixed by `JohnDoe`. And because this is sometimes necessary (for example, you might want customers to display an Amazon location map even if they don't already have an account on your application), Cognito offers the ability to allow unauthenticated guest access, in which case users receive short-term credentials associated with a role of your choice.

![](/images/blog/https-dev-to-uploads.s3.amazonaws.com-uploads-articles-158rp1ssa85xx5ys3kvs.avif)

If the role has s3:* access to the bucket, well... users can do pretty much whatever they want with your bucket and/or your objects. Here's how this can be exploited by an attacker who only knows the identity pool ID (which must be distributed in the frontend application) and the AWS account ID (which is fairly easy to find if the bucket name is also in the frontend code):

```bash
# Creating a guest identity from the pool
% aws cognito-identity get-id \ 
--account-id ACCOUNT-ID_HERE \
--identity-pool-id "REGION:IDENTITY_POOL_ID" \
--region REGION

# AWS API replies with a unique user ID
{
    "IdentityId": "REGION:UNIQUE_USER_ID"
}

# Then we ask for short-term credentials attached to this identity
% aws cognito-identity get-credentials-for-identity \
--identity-id "REGION:UNIQUE_USER_ID" \
--region REGION \
--output json
```

## Recommendations

To avoid these security issues:

1. **Never embed long-term AWS credentials in client-side applications**
2. **Use Cognito Identity Pools with proper role restrictions**
3. **Regularly audit your S3 bucket policies and permissions**
4. **Enable AWS CloudTrail to monitor access patterns**
5. **Use AWS Config rules to detect misconfigurations**

Remember: security in the cloud is a shared responsibility. AWS secures the infrastructure, but you're responsible for securing your data and access patterns.

Need help securing your AWS infrastructure? [Contact TerraCloud](../../../../../index.html) for expert guidance on cloud security best practices!
