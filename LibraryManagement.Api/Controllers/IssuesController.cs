using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using LibraryManagement.data;

namespace LibraryManagement.Api.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using LibraryManagement.data;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Issue>("Issues");
    builder.EntitySet<Book>("Books"); 
    builder.EntitySet<User>("Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class IssuesController : ODataController
    {
        private LibraryManagementEntities db = new LibraryManagementEntities();

        // GET: odata/Issues
        [EnableQuery]
        public IQueryable<Issue> GetIssues()
        {
            return db.Issues;
        }

        // GET: odata/Issues(5)
        [EnableQuery]
        public SingleResult<Issue> GetIssue([FromODataUri] int key)
        {
            return SingleResult.Create(db.Issues.Where(issue => issue.IssueId == key));
        }

        // PUT: odata/Issues(5)
        public IHttpActionResult Put([FromODataUri] int key, Delta<Issue> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Issue issue = db.Issues.Find(key);
            if (issue == null)
            {
                return NotFound();
            }

            patch.Put(issue);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(issue);
        }

        // POST: odata/Issues
        public IHttpActionResult Post(Issue issue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Issues.Add(issue);
            db.SaveChanges();

            return Created(issue);
        }

        // PATCH: odata/Issues(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public IHttpActionResult Patch([FromODataUri] int key, Delta<Issue> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Issue issue = db.Issues.Find(key);
            if (issue == null)
            {
                return NotFound();
            }

            patch.Patch(issue);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IssueExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(issue);
        }

        // DELETE: odata/Issues(5)
        public IHttpActionResult Delete([FromODataUri] int key)
        {
            Issue issue = db.Issues.Find(key);
            if (issue == null)
            {
                return NotFound();
            }

            db.Issues.Remove(issue);
            db.SaveChanges();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/Issues(5)/Book
        [EnableQuery]
        public SingleResult<Book> GetBook([FromODataUri] int key)
        {
            return SingleResult.Create(db.Issues.Where(m => m.IssueId == key).Select(m => m.Book));
        }

        // GET: odata/Issues(5)/User
        [EnableQuery]
        public SingleResult<User> GetUser([FromODataUri] int key)
        {
            return SingleResult.Create(db.Issues.Where(m => m.IssueId == key).Select(m => m.User));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IssueExists(int key)
        {
            return db.Issues.Count(e => e.IssueId == key) > 0;
        }
    }
}
