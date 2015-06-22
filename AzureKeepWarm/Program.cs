using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace AzureKeepWarm
{
    class Program
    {
        static void Main(string[] args)
        {
            var runner = new Runner();
            const string siteUrl = @"http://XXXX.azurewebsites.net";
            const int waitTime = 300;

            var consoleTraceListener = new ConsoleTraceListener(true);
            Trace.Listeners.Add(consoleTraceListener);

            Task.WaitAll(runner.HitSite(siteUrl,waitTime));
        }

        private class Runner
        {            
            private const string ScmSite = @"https://XXXX.scm.azurewebsites.net/azurejobs/#/jobs/continuous/keepwarm";
            private const string ScmPwd = @"YYYY";
            private readonly HttpClient _client = new HttpClient(new HttpClientHandler() { Credentials = new NetworkCredential(ScmSite, ScmPwd) });
 
            public async Task HitSite(string siteUrl, int waitTime)
            {
                while (true)
                {
                    try
                    {
                        var request = await _client.GetAsync(new Uri(siteUrl));
                        Trace.TraceInformation("{0}: {1} -> {2}", DateTime.Now.ToString("F"), siteUrl, request.StatusCode);
                    }
                    catch (Exception ex)
                    {
                        Trace.TraceError(ex.ToString());
                    }
                    await Task.Delay(waitTime * 1000);
                }
            }
        }
    }
}
